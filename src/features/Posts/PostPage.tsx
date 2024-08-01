import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AppState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { fetchOnePost, selectOnePost, selectStatus } from "./PostsSlice";
import Posts from "./Posts";
import PostsLoading from "./components/PostsLoading";
import { Button, Result } from "antd";
import { Helmet } from "react-helmet";

export default function PostPage() {
    const { postId } = useParams();
    const dispatch = useAppDispatch();
    const post = useSelector((state: AppState) => selectOnePost(state, postId!));
    const globalStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'error'>(post ? 'succeeded' : globalStatus);
    useEffect(() => {
        const fetchData = async () => {
            if (status === 'idle') {
                setStatus('loading');
                const result = await dispatch(fetchOnePost(postId!)).unwrap();
                result instanceof Object ? setStatus('succeeded') : setStatus('error');
            }
        }

        fetchData();
    }, [dispatch, postId, status])

    if (status === "error") {
        return (<Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
        />)
    }
    return (
        <>
            {status === 'loading' && <PostsLoading />}
            {(status === 'succeeded' && post) &&
                <>
                    <Helmet>
                        <title>{post.title}</title>
                    </Helmet>
                    <Posts posts={[post]} countPostsType="one" />
                </>}
        </>
    )
}
