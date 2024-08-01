import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../../app/store';
import { fetchAllUsers, selectAllUsers, selectUsersStatus } from './usersSlice';
import { Link } from 'react-router-dom';
import { Card, Flex } from 'antd';
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
                <Flex gap={10} justify='center' align='center' wrap>
                    {users.map(user => (
                        <Card key={user.id} title={user.name} hoverable={true}
                            extra={<Link to={`/users/${user.id}`}>More</Link>} style={{ width: '30%' }}
                            actions={[<SubscribeButton authData={authData} userId={user.id} userFriend={!!user.friend} />]}>
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                            <p>Website: {user.website}</p>
                        </Card>))}
                </Flex>}
        </>
    )
}

export default Users