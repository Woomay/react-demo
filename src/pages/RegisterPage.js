import React from 'react'
import {Link} from 'react-router-dom'
import {Form,Input,Tooltip,Icon,Select,Row,Col,Checkbox,Button} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class Register extends React.Component {
    state ={
        confirmDirty: false,
        autoCompleteResult: [],
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        })
    }
    validateToNextPassword = (rule,value,callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'],{force: true})
        }
        callback();
    }
    compareToFirstPassword = (rule,value,callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }
    render() {
        const {getFieldDecorator,getFieldValue} = this.props.form;
        console.info('getFieldValue',getFieldValue('phone'))
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs:{span:24,offset: 0},
                sm:{span:16,offset: 8},
            }
        }
        const prefixSelector = getFieldDecorator('prefix',{
            initialValue: '86',
        })(
            <Select style={{width: 71}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        )
        return(
            <div className="register-wrapper">
                <Form onSubmit={this.hanleSubmit} className="register-form">
                <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('nickname',{
                            rules:[{
                                required: true,message: 'Please input your nickname!',whitespace: true
                            }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Verifying Code"
                    >
                        {getFieldDecorator('code',{
                            rules:[{ required: true,message: 'Please input your verifying code!'}],
                        })(
                            <div style={{display: 'flex',justifyContent: 'space-between'}}>
                                <Input style={{width: 200}} />
                                <Button type="primary" disabled={getFieldValue('phone') ? false : true}>获取验证码</Button>
                            </div>  
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password',{
                            rules:[{
                                required: true,message: 'Please input your password!',
                            },{
                                validator: this.validateToNextPassword,
                            }]
                        })(<Input type="password" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm',{
                            rules:[{
                                required: true,message: 'Please confirm your password!',
                            },{
                                validator: this.compareToFirstPassword,
                            }]
                        })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                    </FormItem>   
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="register-form-submit">Register</Button>
                        <Link to="/auth/login">Back to login</Link>
                    </FormItem>
                </Form>
            </div>
            
        )
    }
}

const RegisterPage = Form.create()(Register)

export default RegisterPage