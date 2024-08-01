import { useState } from 'react'
import { useAppDispatch } from '../../app/store';
import { addComment } from './commentsSlice';
import { AuthType } from '../Auth/authSlice';
import { Button, Flex, Input } from 'antd';

type PropsType = {
    authData: AuthType,
    postId: string | undefined | number
}

export default function AddComment({ authData, postId }: PropsType) {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();
    const onSubmit = (postId: number, name: string, email: string, body: string) => {
        dispatch(addComment({ postId, name, email, body }));
        setText('');
    }

    return (
        <Flex vertical gap={15} justify='center' align='center' style={{ marginTop: '5px' }}>
            <Flex vertical style={{ width: 600 }}>
                <div>
                    {/* <Typography.Title level={5}>Comment:</Typography.Title> */}
                    <Input.TextArea rows={5} variant='filled' value={text} onChange={(e) => setText(e.target.value)}
                        style={{ resize: "none" }} />
                </div>
            </Flex>
            <Button onClick={() => onSubmit(+postId!, authData.name!, authData.email!, text)}
                type='primary' disabled={!text}>
                Send
            </Button>
        </Flex>
    )
}
