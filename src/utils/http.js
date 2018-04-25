import 'whatwg-fetch';
import {message} from 'antd'
import {loadingStart, loadingEnd} from '../uis/loading/loading';
import {storage, SESSION_USER_INFO} from '../modules/login/reduces/user';

export const GLOBAL_START = '/api';
export const NOT_LOGIN_CODE = -2;
export const SUCCESS_CODE = 0;

export function getUserInfo() {
    return JSON.parse(storage.getItem(SESSION_USER_INFO)) || {};
}
function getUrl(api) {
    return api.indexOf('/njs') === 0 ? api : GLOBAL_START + api;
}

export function parseResponse(response) {
    const json = response.json();
    if (response.status >= 200 && response.status < 300) {
        return json.then(res => {
            if (res.status === SUCCESS_CODE) {
                return Promise.resolve(res);
            }
            message.erroe(res.message, 2);
            if (res.status === NOT_LOGIN_CODE) {
                setTimeout(()=>{
                    window.location.href = '/login/sign-in';
                }, 1500)
            }
            return Promise.reject(res);
        });
    }
    return json
        .then(err => {
            message.error(err.message, 2);
            return Promise.reject(err)
        })
        .catch(() => {
            message.error(response.statusText, 2);
            return Promise.reject(response);
        });
}

function getFn(api) {
    const {token} = getUserInfo();
    return fetch(getUrl(api), {
        headers: {
            "Cache-Control": "no-cache",
            "Accept": "application/json",
            "Content-Type": "application/json",
            token,
        },
    })
}
export function get(api) {
    return loadingStart()
                .then(() => {
                    return getFn(api);
                })
                .then((res)=>{
                    loadingEnd();
                    return parseResponse(res)
                })
}

function postFn(api, body) {
    const {token} = getUserInfo();
    return fetch(getUrl(api), {
        headers: {
            "Cache-Control": "no-cache",
            "Accept": "application/json",
            "Content-Type": "application/json",
            token,
        },
        method: "post",
        body: JSON.stringify(body)
    })
}
export function post(api, body) {
    return loadingStart()
        .then(() => {
            return postFn(api, body);
        })
        .then((res)=>{
            loadingEnd();
            return parseResponse(res)
        })
}

const saveData = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none"); 
    return (blob, fileName) => {
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        console.info(url);
        window.URL.revokeObjectURL(url);
    };
}())

export function download(api,filename, isPost = false, body) {
    return loadingStart()
        .then(() => {
            return !isPost ? getFn(api) : postFn(api, body);
        })
        .then((res)=>{
            return res;
        })
        .then((res) => {
            console.log(res)
            return res.blob();
        })
        .then((blob)=>{
            loadingEnd();
            console.info(blob)
            saveData(blob, filename)
        })
}