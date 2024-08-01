import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { completeTodo, deleteTodo, fetchTodos, selectTodosForUser } from './todosSlice';
import { selectAuthData } from '../Auth/authSlice';
import { Alert, Button, Divider, Flex } from 'antd';

type PropsType = {
    userId: number,
}

export default function TodosForUser({ userId }: PropsType) {
    const dispatch = useAppDispatch();
    const todos = useSelector(state => selectTodosForUser(state, userId));
    const authData = useSelector(selectAuthData);
    const [status, setStatus] = useState<'idle' | 'succeeded' | 'loading' | 'error'>('idle');

    useEffect(() => {
        if (status === 'idle') {
            setStatus('loading');
            dispatch(fetchTodos(userId)).unwrap();
            setStatus('succeeded');
        }
    }, [dispatch, userId, status])
    return (
        <>
            {status === 'loading' && <div>Loading</div>}
            {status === 'succeeded' &&
                <Flex vertical gap={15}>
                    <Divider orientation="left">Users todos</Divider>
                    {todos.map(todo =>
                        !todo.completed ?
                            <Alert
                                key={todo.id}
                                message="Todo performed"
                                description={todo.title}
                                type="info"
                                closable={authData.id === todo.userId}
                                onClose={() => dispatch(deleteTodo(todo.id))}
                                showIcon
                                action={authData.id === todo.userId ?
                                    <Button type='primary' onClick={() => dispatch(completeTodo(todo.id))}>
                                        Complete
                                    </Button> :
                                    null
                                } /> :
                            <Alert
                                key={todo.id}
                                message="Todo completed"
                                description={todo.title}
                                type="success"
                                closable={authData.id === todo.userId}
                                onClose={() => dispatch(deleteTodo(todo.id))}
                                showIcon
                            />
                    )}
                </Flex>}
        </>
    )
}
