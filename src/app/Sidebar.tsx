import { FormOutlined, MessageOutlined, PictureOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useSelector } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { logout, selectAuthData } from '../features/Auth/authSlice';
import { useAppDispatch } from './store';

export default function Sidebar() {
    const navigate = useNavigate();
    const authData = useSelector(selectAuthData);
    const dispatch = useAppDispatch();
    const loginLogout = () => {
        if (!authData.isAuth) {
            navigate('login');
        }
        else {
            dispatch(logout());
        }
    }

    const navigateKey = [
        "users", "albums", "posts", "add-post",
    ]

    const handleClick = (key: string) => {
        navigate(`/${navigateKey[+key - 1]}`)
    }

    return (
        <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, }}>
            <Menu theme="dark" mode="inline" style={{marginTop: '25vh'}} items={[
                {key: "1", icon: <UserOutlined />, label: 'Users'},
                {key: "2", icon: <PictureOutlined />, label: 'Albums'},
                {key: "3", icon: <MessageOutlined />, label: 'Posts'},
                {key: "4", icon: <FormOutlined />, label: 'Add new post'},
            ]} onClick={({key}) => handleClick(key)} selectable={false}> 
            </Menu>
            <div>
                <Button onClick={() => loginLogout()} style={{ position: 'absolute', bottom: '25px', left: '60px' }}>
                    {authData.isAuth ? 'Logout' : 'Login'}
                </Button>
            </div>
        </Sider>
    )
}
