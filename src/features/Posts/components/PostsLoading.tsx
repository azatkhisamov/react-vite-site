import { Avatar, Button, List } from 'antd';
import { CloseCircleOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';

export default function PostsLoading() {
    return (
        <div style={{ width: '900px', margin: '0px auto' }}>
            <List loading
                itemLayout="vertical"
                bordered={true}
                size="large"
                dataSource={[1, 2, 3, 4, 5]}
                renderItem={(item) => (<>
                    <List.Item
                        key={item}
                        actions={[
                            <LikeOutlined />,
                            <Button type='link'>Go to post</Button>,
                            <Button type='link'>
                                Show comments
                            </Button>
                        ]}
                        extra={<CloseCircleOutlined />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
                        />
                    </List.Item>
                </>
                )}
            />
        </div>
    )
}
