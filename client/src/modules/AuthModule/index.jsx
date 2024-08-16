import logo from '@/style/images/idurar-crm-erp.svg';
import useLanguage from '@/hooks/useLanguage';
import { Layout, Col, Divider, Typography } from 'antd';
import SideContent from './SideContent';
import AuthLayout from '@/layout/AuthLayout';

const { Content } = Layout;
const { Title } = Typography;

const AuthModule = ({ authContent, AUTH_TITLE, isForRegister = false }) => {
    const translation = useLanguage();
    return (
        <AuthLayout sideContent={<SideContent />}>
            <Content
                style={{
                    padding: isForRegister ? '40px 30px 30px' : '100px 30px 30px',
                    maxWidth: '440px',
                    margin: '0 auto',
                }}
            >
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            margin: '0px auto 20px',
                            display: 'block',
                        }}
                        height={63}
                        width={220}
                    />
                    <div className="h-2.5 w-full block" />
                </Col>
                <Title level={1}>{translation(AUTH_TITLE)}</Title>

                <Divider />
                <div className="site-layout-content">{authContent}</div>
            </Content>
        </AuthLayout>
    );
};

export default AuthModule;