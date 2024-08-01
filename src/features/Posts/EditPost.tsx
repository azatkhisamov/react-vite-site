import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppState, useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { fetchOnePost, selectOnePost, selectStatus, updatePost } from './PostsSlice';
import { selectAuthData } from '../Auth/authSlice';
import { Button, Flex, Input, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import Result404 from '../components/Result404';
import Result403 from '../components/Result403';

export default function EditPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const post = useSelector((state: AppState) => selectOnePost(state, postId!));
    const authData = useSelector(selectAuthData);
    const globalStatus = useSelector(selectStatus);
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'error'>(post ? 'succeeded' : globalStatus);
    const [title, setTitle] = useState(post?.title);
    const [body, setBody] = useState(post?.body);
    useEffect(() => {
        if (status === 'idle' && authData.isAuth) {
            setStatus('loading');
            dispatch(fetchOnePost(+postId!)).unwrap();
            setStatus('succeeded');
        }
    }, [dispatch, postId, post, status, authData])

    const handleSubmit = (title: string, body: string) => {
        dispatch(updatePost({ id: post.id, title, body, userId: post.userId })).unwrap();
        navigate(`/posts/${post.id}`);
    }

    const canSave = [title, body].every(Boolean);

    // if ((post === undefined || !authData.isAuth) && status === 'succeeded') {
    //     return <Navigate to={'/'} />
    // }

    // if ((post === undefined || !authData.isAuth) && status === 'succeeded') {
    //     return <Navigate to={'/'} />
    // }

    return ((post === undefined && status === 'succeeded') ? <Result404 /> :
        (!authData.isAuth) ? <Result403/> :
        <Flex vertical gap={15} justify='center' align='center'>
            <Helmet>
                <title>Edit post {post.title}</title>
            </Helmet>
            <Flex vertical style={{width: '500px'}}>
                <div>
                    <Typography.Title level={5}>Title:</Typography.Title>
                    <Input required value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <Typography.Title level={5}>Body:</Typography.Title>
                    <Input.TextArea rows={5} required style={{ resize: 'none' }} value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
            </Flex>
            <Button style={{ width: '150px' }} disabled={!canSave} type='primary'
                onClick={() => handleSubmit(title, body)}>
                Save
            </Button>
        </Flex>
    )
}
