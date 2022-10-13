import React, {useEffect} from 'react';
import {Button,Form, Input, message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import style from './LoginPage.module.css'
import {loginServer} from "../../server/server";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {login} from '../../redux/reducers/authReducer'

function LoginPage(props:any) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        loginServer(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
            if(res.data.length > 0){
                dispatch(login(res.data))
                navigate('/')
            }else{
                message.error('用户名和密码不正确')
            }
        })
    };
    return (
        <div style={{height:'100vh',backgroundColor:'#FFFAF0'}}>
            <div className={style.fromDiv}>
                <div className={style.title}>LOGIN</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                                style={{backgroundColor:'#CD853F',border:'0px',marginTop:'10px'}}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;