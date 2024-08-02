import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../../app/store';
import { fetchAllUsers, selectAllUsers, selectUsersStatus } from './usersSlice';
import { Link } from 'react-router-dom';
import { Card, List } from 'antd';
import SubscribeButton from './SubscribeButton';
import { selectAuthData } from '../Auth/authSlice';
import Loading from '../components/Loading';
import { Helmet } from "react-helmet";

const Users = () => {
    const dispatch = useAppDispatch();
    const users = useSelector((state: AppState) => selectAllUsers(state));
    const authData = useSelector(selectAuthData);
    const status = useSelector(selectUsersStatus);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAllUsers())
        }
    }, [dispatch, status])

    return (
        <>
            <Helmet>
                <title>Users</title>
            </Helmet>
            {status === "loading" && <Loading />}
            {status === "succeeded" &&
                <List grid={{ gutter: 10, xs: 1, sm: 2, lg: 3, md: 2, xl: 3, xxl: 3 }} dataSource={users}
                    renderItem={(item) => (
                        <List.Item>
                            <Card key={item.id} title={item.name} hoverable={true}
                                extra={<Link to={`/users/${item.id}`}>More</Link>}
                                actions={[<SubscribeButton authData={authData} userId={item.id} userFriend={!!item.friend} />]}>
                                <p>Email: {item.email}</p>
                                <p>Username: {item.username}</p>
                                <p>Website: {item.website}</p>
                             </Card>
                        </List.Item>
                    )}>

                </List>
            }
        </>
    )
}

export default Users