import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from  '../../utils/storageUtils'
import {reqLogin} from '../../api'
import logo from '../../assets/images/logo.png'
import './login.less'


const Item = Form.Item
class Login extends Component {

    handleSubmit = e => {
        //阻止事件的默认行为： 阻止表单的提交
        e.preventDefault()
        //取出输入的相关的数据
        //const form = this.props.form
       // const values = form.getFieldsValue()
       // const username = form.getFieldValue('username')
       // const password = form.getFieldValue('password')
       // console.log(values, username, password)

       this.props.form.validateFields( async (err, {username, password}) => {
        if (!err) {
            //alert(`发送登录ajax请求, username=${username}, password=${password}`)
            //console.log('Received values of form: ', values);
            const result = await reqLogin(username, password)
            //登录成功
            if(result.status === 0){
                //将user信息保存到local
                const user = result.data
               // localStorage.setItem('user_key', JSON.stringify(user))
               storageUtils.saveUser(user)
               //保存到内存中
               memoryUtils.user = user
                //跳转到管理的界面
                this.props.history.replace('/')
                message.success('登录成功')
            } else {
                //登录失败
                message.error(result.msg)
            }
        } else {
            //alert('验证失败!')
        }
      })

        

      }

    /*对密码进行自定义验证 */
    validatePwd = (rule, value,callback) => {

        value = value.trim()
        if(!value) {
            callback('密码必须输入')
        } else if (value.length<4) {
            callback('密码不能小于4位')
        } else if (value.length > 12) {
            callback('密码不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或者下划线')
        } else {
            callback() //验证通过
        }

    }
    render() {


         //读取保存的user，如果不存在，直接跳转到管理界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
           const user = storageUtils.getUser()
         if(user._id) {
            // this.props.history.replace('/login')  //事件回调函数
            return <Redirect to="/" />  //自动跳转到指定的路由路径
         }

        const { getFieldDecorator } = this.props.form
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>LiYu：后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>

                       { getFieldDecorator('username', 
                        { rules: [  //声明式验证： 使用插件已定义好的规则进行验证
                            { required: true, whitespace: true, message: '用户名是必须' },
                            { min: 4, message: '用户名不能小于4位'},
                            { max: 12, message: '用户名不能大于12位'},
                            { pattern: /^[a-zA-Z0-9_]+$/, message:'用户名必须是英文、数字或者下划线组成'}
                        ],
                            })( 
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"/>
                            )
                        }
                           
                        </Item>

                        <Item>
                        {    getFieldDecorator('password',{ 
                                initialValue: '', //初始值
                                rules: [
                                    { validator: this.validatePwd }
                                ],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password" placeholder="密码"/>
                            )

                        }
                           
                        </Item>

                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                             登 录
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )
    }
}

/* */

const WrapperForm = Form.create()(Login)
export default WrapperForm

