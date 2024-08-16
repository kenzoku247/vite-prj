import { lazy, useEffect } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import {
    changeApp,
    defaultApp,
} from '@/redux/slices/appContextSlice'

import routes from './routes';

const AppRouter = () => {
    let location = useLocation();

    const routesList = [];

    Object.entries(routes).forEach(([key, value]) => {
        routesList.push(...value);
    });

    function getAppNameByPath(path) {
        for (let key in routes) {
            for (let i = 0; i < routes[key].length; i++) {
                if (routes[key][i].path === path) {
                    return key;
                }
            }
        }
        return 'default';
    }
    useEffect(() => {
        if (location.pathname === '/') {
            defaultApp();
        } else {
            const path = getAppNameByPath(location.pathname);
            changeApp(path);
        }
    }, [location]);

    let element = useRoutes(routesList);

    return element;
}

export default AppRouter;