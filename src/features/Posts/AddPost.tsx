import { useState } from 'react'
import { useAppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Input, Result, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../Auth/authSlice';
import { createPost } from './PostsSlice';
import { Helmet } from 'react-helmet';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const authData = useSelector(selectAuthData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!authData.isAuth) {
        return <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
        />
    }

    const handleSubmit = async (title: string, body: string) => {
        const post = await dispatch(createPost({ userId: authData.id!, title, body })).unwrap();
        if (post instanceof Object) {
            navigate(`/posts/${post.id}`)
        }
    }

    const canAdd = [title, body].every(Boolean);

    return (
        <Flex gap={15} vertical justify='center' align='center'>
            <Helmet>
                <title>Add post</title>
            </Helmet>
            <Flex vertical style={{ width: '80%' }}>
                <div>
                    <Typography.Title level={5}>Title:</Typography.Title>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <Typography.Title level={5}>Body:</Typography.Title>
                    <Input.TextArea style={{ resize: 'none' }} rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
            </Flex>
            <Button type='primary' disabled={!canAdd} style={{ width: '150px' }} onClick={() => handleSubmit(title, body)}>Add</Button>
        </Flex>
    )
}
