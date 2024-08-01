import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { requestAllPosts, requestCreatePost, requestDeletePost, requestOnePost, requestPostsForUser, requestUpdatePost } from "../api/api";
import { sub } from "date-fns";
import { getRandomInt } from "../helpers/helpers";


export type CommentType = {
    postId: number,
    id: number | string,
    name: string,
    email: string,
    body: string,
}

export type PostType = {
    userId: number,
    id: number | string,
    title: string,
    body: string,
    likes?: number,
    comments?: CommentType[],
    date?: string,
}

export const fetchPostsForUser = createAsyncThunk<PostType[], number, { rejectedMeta: unknown }>("posts/fetchPostsForUsers",
    async (userId) => {
        return await requestPostsForUser(userId);
    }
)
export const fetchAllPosts = createAsyncThunk<PostType[], void, {state: AppState}>('posts/fetchAllPosts', 
    async () => {
        return await requestAllPosts();
    }
)

export const fetchOnePost = createAsyncThunk<PostType | string | undefined, number | string, { rejectedMeta: unknown }>('posts/fetchOnePost',
    async (postId) => {
        return await requestOnePost(postId);
    }
)

export const createPost = createAsyncThunk<PostType | string | undefined, Pick<PostType, 'userId' | 'title' | 'body'>,
    { rejectedMeta: unknown }>(
        'posts/createPost', async ({userId, title, body}) => {
            return await requestCreatePost(userId, title, body)
        }
    )

export const updatePost = createAsyncThunk<PostType | string | undefined,
    { id: number | string, title: string, body: string, userId: number }, { state: AppState }>(
        'posts/updatePost', async ({ id, title, body, userId }) => {
            if (!Number.isNaN(id)) {
                return {userId, id, title, body};
            }
            return await requestUpdatePost(id, userId, title, body);
        }
    )

export const deletePost = createAsyncThunk<number | string, number | string, { rejectedMeta: unknown }>(
    'posts/deletePost', async (postId) => {
        return await requestDeletePost(postId);
    }
)

export const postsAdapter = createEntityAdapter({
    selectId: (post: PostType) => post.id,
    sortComparer: (a: PostType, b: PostType) => b.date!.localeCompare(a.date!),
})

const initialState = postsAdapter.getInitialState({
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'error'
});

const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        incrementLikes(state, action: PayloadAction<number | string>) {
            state.entities[action.payload].likes! += 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostsForUser.fulfilled, (state, action) => {
            const posts = action.payload.map(post => {
                post.likes = 0;
                post.date = sub(new Date(), { minutes: getRandomInt(70) }).toISOString();
                return post
            });
            postsAdapter.addMany(state, posts)
        })
            .addCase(fetchOnePost.fulfilled, (state, action) => {
                if (action.payload instanceof Object) {
                    action.payload.likes = 0;
                    action.payload.date = sub(new Date(), { minutes: getRandomInt(60) }).toISOString();
                    postsAdapter.addOne(state, action.payload);
                }
            })
            .addCase(createPost.fulfilled, (state, action) => {
                if (action.payload instanceof Object) {
                    action.payload.likes = 0;
                    action.payload.date = new Date().toISOString();
                    action.payload.id = nanoid();
                    postsAdapter.addOne(state, action.payload);
                }
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (action.payload instanceof Object) {
                    action.payload.likes = 0;
                    action.payload.date = new Date().toISOString();
                    postsAdapter.setOne(state, action.payload);
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                postsAdapter.removeOne(state, action.payload);
            })
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const posts = action.payload.map(post => {
                    post.likes = 0;
                    post.date = sub(new Date(), { minutes: getRandomInt(70) }).toISOString();
                    return post
                });
                postsAdapter.setAll(state, posts);
            })
    }
})

export const { incrementLikes } = PostsSlice.actions;
export const {
    selectAll: selectAllPosts,
    selectById: selectOnePost,
} = postsAdapter.getSelectors((state: AppState) => state.posts);
export const selectPostsForUser = createSelector(
    [selectAllPosts, (state: AppState, userId) => state.users.entities[userId]],
    (posts, user) => posts.filter(post => post.userId === user.id)
)
export const selectStatus = (state: AppState) => state.posts.status;

export default PostsSlice.reducer;