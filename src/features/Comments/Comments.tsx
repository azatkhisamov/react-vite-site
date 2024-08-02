import { AppState } from '../../app/store'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, List, Typography, } from 'antd';
import { Link } from 'react-router-dom';
import {  selectCommentsForPost } from './commentsSlice';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../Auth/authSlice';
import AddComment from './AddComment';

type PropsType = {
    postId: string | undefined | number,
}

export default function Comments({ postId }: PropsType) {
    const authData = useSelector(selectAuthData);
    const comments = useSelector((state: AppState) => selectCommentsForPost(state, +postId!))

    return (
        <div style={{ width: '80%', margin: '5px auto' }}>    
            <Typography.Title level={5}>Comments:</Typography.Title>
            <List
                itemLayout="vertical"
                size="small"
                dataSource={comments}
                bordered={true}
                grid={{ gutter: 16, column: 1 }}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined size={64}/>} />}
                            title={<Link to={`/users/${item.name}`}>{item.name}</Link>}
                            description={item.email}
                        />
                        {item.body}
                    </List.Item>
                )}
            />
            {(authData.isAuth && comments.length !== 0) && <AddComment authData={authData} postId={postId}/>}
        </div>

    )
}
