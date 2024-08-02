import { useEffect, useState } from 'react'
import { AppState, useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { fetchPhotos, selectPhotosForAlbum } from './photosSlice';
import { Image, List, Skeleton } from 'antd';

type PropsType = {
    albumId: number
}

export default function PhotosForAlbum({ albumId }: PropsType) {
    const dispatch = useAppDispatch();
    const photos = useSelector((state: AppState) => selectPhotosForAlbum(state, +albumId!));
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'error'>('idle');

    useEffect(() => {
        if (status === 'idle') {
            setStatus('loading');
            dispatch(fetchPhotos(albumId));
            setStatus('succeeded');
        }
    }, [dispatch, status, albumId])
    return (
        <>
            {status === 'loading' &&
                <>
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                </>}
            {status === 'succeeded' &&
                <List grid={{ gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
                    dataSource={photos} style={{margin: '0 auto'}} renderItem={(item) => (
                        <List.Item>
                            <Image alt={item.title} src={item.thumbnailUrl} key={item.id} />
                        </List.Item>
                    )}>

                </List>
            }
        </>
    )
}
