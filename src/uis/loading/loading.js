import 'loaders.css/loaders.min.css';
import './loading.css';

const id = 'http-loading';
export function loadingStart() {
    if (!document.getElementById(id)) {
        const element = document.createElement('div');
        element.id = id;
        element.className = 'loader';
        element.innerHTML = '<div class="loader-box ball-pulse"><div></div><div></div><div></div></div>';
        document.body.appendChild(element);   
    }
    return Promise.resolve();
}
export function loadingEnd() {
    const element = document.getElementById(id);
    element && document.body.removeChild(element);
}
export default {}