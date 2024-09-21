import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useLanguage from '@/hooks/useLanguage'
import { activateUser } from '@/redux/slices/authSlice';
import { Result, Button } from 'antd';;

const ActivationUser = () => {
    const { activation_token } = useParams()
    const navigate = useNavigate();
    const translate = useLanguage();
    const dispatch = useDispatch();
    const { current } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (activation_token) {
            dispatch(activateUser({ activation_token }))
        }
    }, [activation_token, dispatch])
    console.log(current.access_token);
    useEffect(() => {
        if(current.access_token) 
        navigate('/')
    }, [current.access_token, navigate])
    return (
        <Result
            status="404"
            title={translate('error_404')}
            subTitle={translate('Sorry the Page you requested is expired')}
            extra={
                <Button
                    type="primary"
                    onClick={() => {
                        navigate('/register');
                    }}
                >
                    {translate('Go To Register Page')}
                </Button>
            }
        />
    )
}

export default ActivationUser;