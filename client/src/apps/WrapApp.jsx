import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import PageLoader from "@/components/PageLoader";
import AuthRouter from "@/router/AuthRouter";
import Theme from "@/components/Theme";

const MainApp = lazy(() => import('./MainApp'))

const WrapApp = () => {
    const auth = useSelector((state) => state.auth);
    if (!auth.isLoggedIn) {
        console.log(
            '🚀 Welcome to HOFU! Did you know that we also offer commercial customization services? Contact us at hello@hofu.com for more information.'
        );
        return <>
            <Theme>
                <AuthRouter />
            </Theme>
        </>
    } else {
        return <>
            <Theme>
                <Suspense fallback={<PageLoader />}>
                    <MainApp />
                </Suspense>
            </Theme>
        </>
    }
}

export default WrapApp;