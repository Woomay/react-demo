import React from 'react'
import {Switch,Route,Redirect,NavLink} from 'react-router-dom'
import PrimaryHeader from '../components/PrimaryHeader'
import AppHomePage from '../pages/AppHomePage'
import OrderPage from '../pages/OrderPage'
import UserSubLayout from './UserSubLayout'
import ProductSubLayout from './ProductSubLayout'

import {Layout,Menu,Icon} from 'antd'

const {Header,Sider,Content,Footer} = Layout

class PrimaryLayout extends React.Component {
    state = {
        collapsed: false
    };
    handleToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const {match} = this.props
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint='lg'
                    trigger={null}
                    collapsiable
                    collapsed={this.state.collapsed}
                >  
                    <div className="logo">React App</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span><NavLink to="/app" exact activeClassName="active">Home</NavLink></span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span><NavLink to="/app/users" activeClassName="active">Users</NavLink></span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span><NavLink to="/app/products" activeClassName="active">Products</NavLink></span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="upload" />
                            <span><NavLink to="/app/order" activeClassName="active">Order</NavLink></span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon 
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.handleToggle}
                            style={{fontSize: 24}}
                        />
                        <PrimaryHeader />
                        <Icon type="team" style={{fontSize: 24}} />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <main>
                            <Switch>
                                <Route path={`${match.path}`} exact component={AppHomePage} />
                                <Route path={`${match.path}/users`} component={UserSubLayout} />
                                <Route path={`${match.path}/products`} component={ProductSubLayout} />
                                <Route path={`${match.path}/order`} component={OrderPage} />
                                <Redirect to={`${match.url}`} />
                            </Switch>
                        </main>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        basic react demo by hyx
                    </Footer>
                </Layout>
            </Layout>

        );
    }
}


export default PrimaryLayout