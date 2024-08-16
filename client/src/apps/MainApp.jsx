import { useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';

import Navigation from "./Navigation/NavigationContainer";
import HeaderContent from "./Header/HeaderContainer";

import PageLoader from "@/components/PageLoader";
import AppRouter from "@/router/AppRouter";
import storePersist from "@/redux/storePersist";
import useResponsive from "@/hooks/useResponsive";
import { listSettings } from '@/redux/slices/settingsSlice';
import { translate } from "@/redux/slices/translationSlice";


const MainApp = () => {
    const { Content } = Layout;

    const { isMobile } = useResponsive();

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(listSettings({ entity: 'setting' }));
    }, []);
    const appSettings = useSelector((state) => state.settings.result.app_settings);
    const settingIsLoaded = useSelector((state) => state.settings.isSuccess);

    useEffect(() => {
        const { loadDefaultLang } = storePersist.get('firstVisit');
        if (appSettings.idurar_app_language && !loadDefaultLang) {
            dispatch(translate(appSettings.idurar_app_language));
            window.localStorage.setItem('firstVisit', JSON.stringify({ loadDefaultLang: true }));
        }
    }, [appSettings]);

    const langDirection = useSelector((state) => state.translation.langDirection);

    if (settingIsLoaded) {
        return (
            <Layout hasSider style={{ flexDirection: langDirection === 'rtl' ? 'row-reverse' : 'row' }}>
                {/* {currentApp === 'default' ? <Navigation /> : <ExpensesNav />} */}
                <Navigation />

                {isMobile ? (
                    <Layout style={{ marginLeft: 0 }}>
                        <HeaderContent />
                        <Content
                            style={{
                                margin: '40px auto 30px',
                                overflow: 'initial',
                                width: '100%',
                                padding: '0 25px',
                                maxWidth: 'none',
                            }}
                        >
                            <AppRouter />
                        </Content>
                    </Layout>
                ) : (
                    <Layout>
                        <HeaderContent />
                        <Content
                            style={{
                                margin: '40px auto 30px',
                                overflow: 'initial',
                                width: '100%',
                                padding: '0 50px',
                                maxWidth: 1400,
                            }}
                        >
                            <AppRouter />
                        </Content>
                    </Layout>
                )}
            </Layout>
        );
    } else return <PageLoader />;
}

export default MainApp;