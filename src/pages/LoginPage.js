import React from 'react'
import { Link } from 'react-router-dom'
import { login } from '../utils/xhr'

import { Form,Icon,Input,Button,Checkbox } from 'antd'
const FormItem = Form.Item;
// const LoginPage = ({history}) => (
//     <div>
//         <h1>Login Page</h1>
//         <p>
//         For this example application, we cannot visit <Link to="/app">/app</Link> until we are logged in.
//         Clicking the "Login" button will simulate a login by setting Redux state. This example compliments
//         the CSS-Tricks article I wrote for <a rel="noopener noreferrer" target="_blank" href="https://css-tricks.com/react-router-4/">React Router 4</a>.
//         </p>
//         <button onClick={() => {
//             login()
//                 .then(() => {
//                     history.push('/app')
//                 })
//         }}>
//             Login
//         </button>
//     </div>
// )

class Login extends React.Component {
    handleSubmit = (e) => {
        const {history} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if (!err) {
                login().then(() => {history.push('/app')})
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>  
                    {getFieldDecorator('username', {
                        rules:[{required: true,message: 'please input your Username!'},],
                    })(
                        <Input prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password',{
                        rules:[{required: true,message: 'Please input your Password!'}],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />} type="password" placeholder="Password" /> 
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                    Or <Link to="/auth/register">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}
const LoginPage = Form.create()(Login)
export default LoginPage