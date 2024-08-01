import { useParams } from 'react-router-dom'
import { AppState, useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Divider} from 'antd';
import { fetchOneAlbum, selectAlbumById, selectAlbumStatus } from './albumsSlice';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';
import Result404 from '../components/Result404';
import PhotosForAlbum from '../Photos/PhotosForAlbum';

export default function AlbumPage() {
    const dispatch = useAppDispatch();
    const { albumId } = useParams();
    const album = useSelector((state: AppState) => selectAlbumById(state, +albumId!));
    const globalStatus = useSelector(selectAlbumStatus);
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'error'>(album ? 'succeeded' : globalStatus);

    useEffect(() => {

        const fetchData = async () => {
            if (status === 'idle') {
                setStatus('loading');
                const result = await dispatch(fetchOneAlbum(+albumId!)).unwrap()
                result instanceof Object ? setStatus('succeeded') : setStatus('error');
            }
        }

        fetchData();
    }, [dispatch, albumId, status])

    if (status === 'error') {
        return <Result404/>
    }

    return (<>
        {status === 'loading' && <Loading />}
        {(status === 'succeeded' && album) && <>
            <Helmet>
                <title>{album.title}</title>
            </Helmet>
            <Divider orientation="left">{album.title}</Divider>
            <PhotosForAlbum albumId={+albumId!}/>
            </>}
    </>
    )
}
