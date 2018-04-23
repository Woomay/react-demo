import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom'
import store from './store'
import AuthorizedRoute from './AuthorizedRoute'
import UnauthorizedLayout from './layouts/UnauthorizedLayout'
import PrimaryLayout from './layouts/PrimaryLayout'
import registerServiceWorker from './registerServiceWorker';

import './public/css/index.css'
import 'antd/dist/antd.css'

const App = props => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/auth" component={UnauthorizedLayout} />
                    <AuthorizedRoute path="/app" component={PrimaryLayout} />
                    <Redirect to="/auth" />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
