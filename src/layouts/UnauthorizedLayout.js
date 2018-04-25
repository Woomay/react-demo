import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage';

const UnauthorizedLayout = () => (
    <div className="unauthorized-layout">
        <Switch>
            <Route path="/auth/login" component={LoginPage} />
            <Route path="/auth/register" component={RegisterPage} />
            <Redirect to="/auth/login" />
        </Switch>
    </div>
)

export default UnauthorizedLayout