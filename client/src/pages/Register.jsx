import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLanguage from '@/hooks/useLanguage'
import { Form, Button } from 'antd';
import { register } from '@/redux/slices/authSlice';
import RegisterForm from '@/forms/RegisterForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

const RegisterPage = () => {
    const translation = useLanguage()
    const { isLoading, isSuccess } = useSelector((state) => state.auth);
    const langDirection = useSelector((state) => state.translation.langDirection)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(register({ registerData: values }));
        navigate('/')
    };
    const FormContainer = () => {
        return (
            <Loading isLoading={isLoading}>
                <Form
                    layout="vertical"
                    name="normal_register"
                    className="register-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <RegisterForm />
                    <Form.Item>
                        <a className="login-navigate" href="/login" style={{ marginLeft: langDirection === "rtl" ? "220px" : "0px" }}>
                            {translation('Or already have an account, Login now')}
                        </a>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-form-button"
                            loading={isLoading}
                            size="large"
                        >
                            {translation('Register')}
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
        )
    }

    return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Register" isForRegister="true" />;
};

export default RegisterPage;