import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgetPassword from '@/pages/ForgetPassword';
import ResetPassword from '@/pages/ResetPassword';
import ActivationUser from '@/pages/ActivationUser'
import NotFound from '@/components/NotFound';

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Navigate to="/login" replace />} path="/logout" />
            <Route element={<ForgetPassword />} path="/forgetpassword" />
            <Route element={<ActivationUser />} path="/activateUser/:activation_token" />
            <Route element={<ResetPassword />} path="/resetpassword/:userId/:resetToken" />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AuthRouter;