import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, incrementLikes, selectPosts } from './PostsSlice';
import { AppDispatch } from '../../app/store';
import { LikeTwoTone } from '@ant-design/icons';
import styles from './Posts.module.css';

type propsType = {
    userId: string | undefined
}

export default function Posts({ userId }: propsType) {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector(selectPosts)
    useEffect(() => {
        dispatch(fetchPosts(+userId!));
    }, [dispatch, userId])

    // const increment = (id: number) => {
    //     dispatch(incrementLikes(id));
    // }
    return (<>
        UserPage {userId}
        <div className={styles.postWrapper}>
            {posts.map(post =>
                <div key={post.id} className={styles.post}>
                    <h4>
                        {post.id}: {post.title}
                    </h4>
                    <p>
                        {post.body}
                    </p>
                    <LikeTwoTone onClick={() => dispatch(incrementLikes({typePost:"all", id: post.id}))}/>{post.likes}
                </div>)}
        </div>
    </>
    )
}
