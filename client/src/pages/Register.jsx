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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(register({ registerData: values }));
    };
    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess]);
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

    return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Register" />;
};

export default RegisterPage;