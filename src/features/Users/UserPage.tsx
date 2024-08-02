import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../app/store';
import { fetchOneUser, selectUserById, selectUsersStatus } from './usersSlice';
import { useEffect, useState } from 'react';
import { Col, Descriptions, Divider, Flex, Row } from "antd";
import SubscribeButton from './SubscribeButton';
import UserPosts from '../Posts/UserPosts';
import { selectAuthData } from '../Auth/authSlice';
import AlbumsForUser from '../Albums/AlbumsForUser';
import TodosForUser from '../Todos/TodosForUser';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';
import Result404 from '../components/Result404';


function UserPage() {
  const { userId } = useParams();
  const user = useSelector((state: AppState) => selectUserById(state, +userId!));
  const authData = useSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const globalStatus = useSelector(selectUsersStatus);
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'error'>(user ? 'succeeded' : globalStatus);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'idle') {
        setStatus('loading');
        const result = await dispatch(fetchOneUser(userId!)).unwrap();
        (result instanceof Object) ? setStatus('succeeded') : setStatus('error');
      }
    }
    fetchData();
  }, [dispatch, status, userId])

  if (status === 'error') {
    return <Result404/>
  }

  return (<>
    {status === 'loading' && <Loading />}
    {(status === 'succeeded' && user !== undefined) &&
      <Flex vertical gap={10} align='center' justify='center'>
        <Helmet>
          <title>{user?.name}</title>
        </Helmet>
        <Divider orientation="left">User info</Divider>
        <Descriptions column={1} style={{ marginBottom: '50px' }} extra={authData.id! !== user.id &&
          authData.isAuth && <SubscribeButton authData={authData} userId={user.id}
            userFriend={!!user.friend} />}>
          {Object.entries(user).map(([key, value]) => {
            if (typeof value !== 'object' && key !== 'friend' && key !== 'id') {
              return <Descriptions.Item key={key} label={key[0].toUpperCase() + key.slice(1)}>
                {value}
              </Descriptions.Item>
            }
            else if (typeof value === 'object') {
              return <Descriptions.Item key={key} label={key[0].toUpperCase() + key.slice(1)}>
                {Object.values(value).filter(value => typeof value !== 'object').join(', ')}
              </Descriptions.Item>
            }
          }
          )}
        </Descriptions>
        <AlbumsForUser userId={+userId!} />
        <Row gutter={20}>
          <Col md={24} lg={8}>
            <TodosForUser userId={+userId!} />
          </Col>
          <Col md={24} lg={16}>
            <UserPosts userId={userId} />
          </Col>
        </Row>
      </Flex>
    }
  </>
  )
}

export default UserPage