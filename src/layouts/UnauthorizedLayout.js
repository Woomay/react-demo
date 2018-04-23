import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage';

const UnauthorizedLayout = () => (
    <div className="unauthorized-layout">
        {
            /*
            Imagine this could be a general layout for all unauthorized pages like
    the login page, forgot password, email-verified, etc...
    
    For this example project, we'll just have a Login Page
            */
        }
        <Switch>
            <Route path="/auth/login" component={LoginPage} />
            <Route path="/auth/register" component={RegisterPage} />
            <Redirect to="/auth/login" />
        </Switch>
    </div>
)

export default UnauthorizedLayout