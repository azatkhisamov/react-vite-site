import { Button } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../../app/store';
import { fetchComments } from '../../Comments/commentsSlice';

type PropsType = {
    postId: string | number,
    postsWithComments: (string | number)[],
    setPostsWithComments: React.Dispatch<React.SetStateAction<(string | number)[]>>
}

export default function CommentButton({ postId, postsWithComments, setPostsWithComments }: PropsType) {
    // const [postsWithComments, setPostsWithComments] = useState<Array<number | string>>([]);
    const dispatch = useAppDispatch();
    
    const showComments = (postId: number | string) => {
        dispatch(fetchComments(postId!));
        setPostsWithComments(prev => [...prev, postId]);
    }

    const closeComments = (postId: number | string) => {
        setPostsWithComments(prev => prev.filter(id => id !== postId))
    }

    return (
        <>
            {!(postsWithComments.some(id => id === postId)) ?
            <Button type='link' onClick={() => showComments(postId)}>
                Show comments
            </Button> :
            <Button type='link' onClick={() => closeComments(postId)}>
                Close comments
            </Button>}
        </>
    )
}
