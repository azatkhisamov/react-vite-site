import { useState } from 'react'
import { useSelector } from 'react-redux'
import { login, selectAuthData } from './authSlice'
import { useAppDispatch } from '../../app/store';
import { Navigate } from 'react-router-dom';
import { Alert, Button, Flex, Input, Typography } from 'antd';
import { Helmet } from 'react-helmet';

export default function Login() {
    const authData = useSelector(selectAuthData);
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    if (authData.isAuth) {
        return <Navigate to='/' />
    }
    return (
        <Flex vertical gap={15} justify='center' align='center'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Flex vertical style={{ width: '80%' }}>
                <Typography.Title level={5}>
                    Email:
                </Typography.Title>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Flex>
            <Button type='primary' style={{width: '150px'}} onClick={() => dispatch(login(name))}>Login</Button>
            {authData.error && 
            <Alert message="Error" description="Invalid Email." type="error" showIcon closable />}
        </Flex>
    )
}
