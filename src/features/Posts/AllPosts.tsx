import { useEffect } from 'react'
import Posts from './Posts';
import { AppState, useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { fetchAllPosts, selectAllPosts, selectStatus } from './PostsSlice';
import PostsLoading from './components/PostsLoading';
import { Helmet } from 'react-helmet';

export default function AllPosts() {
    const dispatch = useAppDispatch();
    const posts = useSelector((state: AppState) => selectAllPosts(state));
    const status = useSelector(selectStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllPosts());
        }
    }, [dispatch, posts, status])

    return (
        <div>
            {status === 'succeeded' && <>
                <Helmet>
                    <title>All posts</title>
                </Helmet>
                <Posts posts={posts} countPostsType='many' />
            </>}
            {status === 'loading' && <PostsLoading />}
        </div>
    )
}
