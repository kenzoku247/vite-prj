import React from "react";
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import useLanguage from "@/hooks/useLanguage";
import { useSelector } from "react-redux";

const LoginForm = () => {
    const langDirection = useSelector((state) => state.translation.langDirection)
    const translation = useLanguage();
    return (
        <div style={{ direction: langDirection }}>
            <Form.Item
                label={translation('username')}
                name="username"
                rules={[
                    {
                        required: true,

                    },
                    {
                        type: 'username',
                    },
                ]}

            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder={translation('username')}
                    type="username"
                    size="large"
                />
            </Form.Item>
            <Form.Item
                label={translation('password')}
                name="password"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder={translation('password')}
                    size="large"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>{translation('Remember me')}</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="/forgetpassword" style={{ marginLeft: langDirection === "rtl" ? "220px" : "0px" }}>
                    {translation('Forgot password')}
                </a>

            </Form.Item>
            <Form.Item>
                <a className="float-right" href="/register" style={{ marginLeft: langDirection === "rtl" ? "220px" : "0px" }}>
                    {translation('Create a new account')}
                </a>
            </Form.Item>
        </div>
    )
}

export default LoginForm;