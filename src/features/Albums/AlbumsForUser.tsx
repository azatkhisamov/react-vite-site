import { AppState, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { albumsStatus, fetchAlbumsForUser, selectAlbumsForUsers } from './albumsSlice';
import { useEffect, useState } from 'react';
import { Divider } from 'antd';
import Albums from './Albums';
import Loading from '../components/Loading';

type PropsType = {
    userId: number
}

export default function AlbumsForUser({ userId }: PropsType) {
    const dispatch = useAppDispatch();
    const albums = useSelector((state: AppState)  => selectAlbumsForUsers(state, userId));
    const globalStatus = useSelector(albumsStatus);
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'error'>(globalStatus);

    useEffect(() => {
        if (status === 'idle') {
            setStatus('loading');
            dispatch(fetchAlbumsForUser(userId)).unwrap();
            setStatus('succeeded');
        }
    }, [dispatch, userId, status]);

    return (
        <>
            {status === 'loading' && <Loading/>}
            {status === 'succeeded' && 
            <>
                <Divider orientation="left">User albums</Divider>
                <Albums albums={albums} albumsOnPage={3} />
            </>
            }
        </>

    )
}
