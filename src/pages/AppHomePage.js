import React from 'react'
import { logout } from '../utils/xhr'
import {message} from 'antd'
const AppHomePage = ({history}) => (
    <div>
        App Home Page
        <br/><br/>
        <button onClick={() => {
            logout()
                .then(() => {history.push('/')})
                message.error('即将前往登录页面',1)      
        }}
        >
            Logout
        </button>
    </div>
)

export default AppHomePage