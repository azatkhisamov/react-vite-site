import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../app/store';
import { fetchPostsForUser, selectPostsForUser, selectStatus } from './PostsSlice';
import Posts from './Posts';
import PostsLoading from './components/PostsLoading';
import { Alert, Divider } from 'antd';

type propsType = {
    userId: string | undefined
}

export default function UserPosts({ userId }: propsType) {
    const dispatch = useAppDispatch();
    const posts = useSelector((state: AppState) => selectPostsForUser(state, +userId!));
    const globalStatus = useSelector(selectStatus);
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'error'>(globalStatus);

    useEffect(() => {
        if (status === 'idle') {
            setStatus('loading')
            dispatch(fetchPostsForUser(+userId!)).unwrap();
            setStatus('succeeded')
        }
    }, [dispatch, userId, globalStatus, status])

    if (status === 'succeeded' && posts.length === 0) {
        return (<>
            <Divider orientation="left">
                User posts
            </Divider>
            <Alert message="No posts" type="warning" />
        </>)
    }

    return (<>
        {status === 'loading' && <PostsLoading />}
        {status === 'succeeded' &&
            <div>
                <Divider orientation="left">User Posts</Divider>
                <Posts posts={posts} countPostsType='many' />
            </div>}
    </>
    )
}
