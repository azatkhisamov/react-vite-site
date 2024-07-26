import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { fetchViewedPost, incrementLikes, selectPostById } from "./PostsSlice";
import { LikeTwoTone } from '@ant-design/icons';
import Comments from "../Comments/Comments";

export default function PostPage() {
    const { postId } = useParams();
    const dispatch = useAppDispatch();
    const post = useSelector(selectPostById);

    useEffect(() => {
        dispatch(fetchViewedPost(+postId!));
    }, [dispatch, postId])

    const content = post &&
        <div>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
            <LikeTwoTone onClick={() => dispatch(incrementLikes({typePost:"viewed", id: post.id}))} />{post.likes}
        </div>
    return (
        <>
            <div>
                PostPage
            </div>
            <div>{content}</div>
            <div><Comments postId={postId}/></div>
        </>

    )
}
