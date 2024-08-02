import { FormOutlined, HomeOutlined, MessageOutlined, PictureOutlined, TeamOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useSelector } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { logout, selectAuthData } from '../features/Auth/authSlice';
import { useAppDispatch } from './store';

export default function Sidebar() {
    const navigate = useNavigate();
    const authData = useSelector(selectAuthData);
    const dispatch = useAppDispatch();

    const navigateKey = [
        'login', "/", "users", "albums", "posts", "add-post",
    ]

    const handleClick = (key: string) => {
        if (+key === 1 && authData.isAuth) {
            dispatch(logout())
        }
        else {
            navigate(`/${navigateKey[+key - 1]}`)
        }
    }

    return (
        <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, }}
            breakpoint="md" collapsedWidth={50} width={180}>
            <Menu theme="dark" mode="inline" style={{marginTop: '25vh'}} items={[
                {key: "1", icon: !authData.isAuth ? <UserAddOutlined /> : <UserDeleteOutlined />, 
                    label: authData.isAuth ? 'Logout' : 'Login'},
                {key: "2", icon: <HomeOutlined />, label: 'Main page'},
                {key: "3", icon: <TeamOutlined />, label: 'Users'},
                {key: "4", icon: <PictureOutlined />, label: 'Albums'},
                {key: "5", icon: <MessageOutlined />, label: 'Posts'},
                {key: "6", icon: <FormOutlined />, label: 'Add new post'},
            ]} onClick={({key}) => handleClick(key)} selectable={false}> 
            </Menu>
        </Sider>
    )
}
