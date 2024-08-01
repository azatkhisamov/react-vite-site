import { memo } from 'react';
import { useAppDispatch } from '../../app/store'
import { AuthType } from '../Auth/authSlice';
import { subscribing } from './usersSlice';
import { Button } from 'antd';

type PropsType = {
    userId: number,
    userFriend: boolean,
    authData: AuthType,
}

const SubscribeButton = memo(function SubscribeButton({ userId, userFriend, authData }: PropsType) {
    const dispatch = useAppDispatch();
    return (
        (authData.isAuth && authData?.id !== userId) ?
        <Button type='primary' onClick={() => dispatch(subscribing((userId)))} size='small' >
            {!userFriend ? 'subscribe' : 'unsubscribe'}
        </Button > : <Button type='primary' size='small' style={{visibility: 'hidden'}} ></Button >
    )
})

export default SubscribeButton;
