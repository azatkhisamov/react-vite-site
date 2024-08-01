import { useEffect, useState } from 'react'
import { AppState, useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { fetchPhotos, selectPhotosForAlbum } from './photosSlice';
import { Flex, Image, Skeleton } from 'antd';

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
                <Flex gap={15} justify='space-around' align='center' wrap>
                    {photos.map(photo =>
                        <Image alt={photo.title} src={photo.thumbnailUrl} key={photo.id} width={'30%'} />)}
                </Flex>}
        </>
    )
}
