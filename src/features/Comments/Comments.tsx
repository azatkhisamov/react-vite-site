import {  useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addComment, fetchComments, selectComments } from './commentsSlice'
import { useAppDispatch } from '../../app/store'
import { Button } from 'antd'

type PropsType = {
    postId: string | undefined
}

export default function Comments({ postId }: PropsType) {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const comments = useSelector(selectComments);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchComments(+postId!))
    }, [dispatch, postId])

    const onSubmit = (postId: number , name: string, email: string, body: string) => {
        dispatch(addComment({postId ,name, email, body}));
        setText('');
        setName('');
        setEmail('');
    }
    
    const content = comments && comments.map(comment => (
    <div key={comment.id}>
        <h6>{comment.name} - {comment.email}</h6>
        <p>{comment.body}</p>
    </div>))
    // debugger
    return(
    <>
        <div>Comments:</div>
        <div>{content}</div>
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <div>
            <Button onClick={() => onSubmit(+postId!, name, email, text)} type='primary'>Send</Button>
            {/* <button onClick={() => onSubmit(+postId!, name, email, text)}></button> */}
        </div>
    </>

    )
}
