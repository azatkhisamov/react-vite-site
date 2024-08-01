import { useState } from 'react'
import { deletePost, incrementLikes, PostType } from './PostsSlice';
import { useAppDispatch } from '../../app/store';
import { CloseCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, List, Avatar, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../Auth/authSlice';
import LikeButton from './components/LikeButton';
import CommentButton from './components/CommentButton';

type propsType = {
    posts: PostType[],
    countPostsType: 'one' | 'many',
}

export default function Posts({ posts, countPostsType }: propsType) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authData = useSelector(selectAuthData);
    const [postsWithComments, setPostsWithComments] = useState<Array<number | string>>([]);
    const [idRemove, setIdRemove] = useState<number | string | undefined>();

    const deleteOnePost = (postId: number | string) => {
        dispatch(deletePost(postId)).unwrap();
        setIdRemove(undefined);
    }

    return (<>
        <div>
            <List
                itemLayout="vertical"
                bordered={true}
                size="large"
                dataSource={posts}
                pagination={(posts.length > 5) && {
                    position: "top",
                    align: "center",
                    pageSize: 5,
                    showSizeChanger: false
                }}
                renderItem={(item) => (<>
                    <List.Item
                        key={item.id}
                        actions={[
                            <LikeButton countLikes={item.likes} increment={() => dispatch(incrementLikes(item.id))} />,
                            countPostsType === 'many' ?
                                <Button type='link' onClick={() => navigate(`/posts/${item.id}`)}>
                                    Go to post
                                </Button> : null,
                            <CommentButton postId={item.id} postsWithComments={postsWithComments}
                                setPostsWithComments={setPostsWithComments} />,
                            authData.id === item.userId ? <Button type='link' onClick={() => navigate(`/posts/${item.id}/edit`)}>
                                Edit post
                            </Button> : null,
                            <p>{formatDistanceToNow(parseISO(item.date!))} ago</p>
                        ].filter(action => action !== null)}
                        extra={authData.id === item.userId ? <CloseCircleOutlined size={30}
                            onClick={() => setIdRemove(item.id)} /> : null}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
                            title={<a href={item.title}>{item.title}</a>}
                            description={item.id}
                        />
                        {item.body}
                    </List.Item>
                    {(postsWithComments.some(id => id === item.id)) && <Comments postId={item.id} />}
                </>
                )}
            />
            <Modal title="Confirmation" open={!!idRemove} onOk={() => deleteOnePost(idRemove!)}
                onCancel={() => setIdRemove(undefined)}>
                <p>Are you sure you want to delete the post number?</p>
            </Modal>
        </div>
    </>
    )
}
