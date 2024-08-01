import { useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { albumsStatus, fetchAllAlbums, selectAlbums } from './albumsSlice';
import { useEffect } from 'react';
import { Divider } from 'antd';
import Albums from './Albums';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';

export default function AllAlbums() {
    const dispatch = useAppDispatch();
    const albums = useSelector(selectAlbums);
    const status = useSelector(albumsStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllAlbums());
        }
    }, [dispatch, status]);

    return (
        <>
            {status === 'loading' && <Loading />}
            {status === 'succeeded' &&
                <>
                    <Helmet>
                        <title>All albums</title>
                    </Helmet>
                    <Divider orientation="left">All albums</Divider>
                    <Albums albums={albums} albumsOnPage={9} />
                </>
            }
        </>

    )
}
