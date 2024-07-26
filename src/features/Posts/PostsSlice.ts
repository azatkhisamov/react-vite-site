import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../../app/store";

const URL_BASE = "https://jsonplaceholder.typicode.com/";

export type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string,
    likes?: number 
}

// type PostsType = fetchPostsType & { likes: number }

const initialState = {
    posts: [] as PostType[],
    viewedPost: null as PostType | null
}

export const fetchPosts = createAsyncThunk<PostType[], number, { rejectedMeta: unknown }>("posts/fetchPosts", 
    async (userId) => {
    try {
        const response = await axios.get(`${URL_BASE}posts/?userId=${userId}`);
        return response.data;
    }
    catch (error) {
        return (error as Error).message;
    }
})

export const fetchViewedPost = createAsyncThunk<PostType, number, {rejectedMeta: unknown}>('posts/fetchViewedPost',
    async (postId) => {
        const response = await axios.get(`${URL_BASE}posts/${postId}`);
        return response.data;
    }
)

type payloadType = {
    typePost: "viewed" | "all",
    id: number,
}

const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        incrementLikes(state, action: PayloadAction<payloadType>) {
            const post = action.payload.typePost === "all" ? state.posts.find(post => post.id === action.payload.id) 
            : state.viewedPost;
            if (post && post.likes !== undefined) {
                post.likes += 1;
                // state.posts.find(post => post.id = action.payload).likes += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            const postsWithLikes = action.payload.map(post => {
                post.likes = 0;
                return post
            });
            state.posts = [];
            state.posts = state.posts.concat(postsWithLikes);
        })
        .addCase(fetchViewedPost.fulfilled, (state, action) => {
            action.payload.likes = 0;
            state.viewedPost = {...action.payload};
        })
    }
})

export const {incrementLikes} = PostsSlice.actions;
export const selectPosts = (state: AppState) => state.posts.posts;
export const selectPostById = (state: AppState) => state.posts.viewedPost;

export default PostsSlice.reducer;