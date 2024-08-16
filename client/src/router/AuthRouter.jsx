import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import ForgetPassword from '@/pages/ForgetPassword';
import ResetPassword from '@/pages/ResetPassword';
import NotFound from '@/components/NotFound';

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Navigate to="/login" replace />} path="/logout" />
            <Route element={<ForgetPassword />} path="/forgetpassword" />
            <Route element={<ResetPassword />} path="/resetpassword/:userId/:resetToken" />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AuthRouter;