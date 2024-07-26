import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Users/usersSlice.ts";
import postsReducer from "../features/Posts/PostsSlice.ts";
import commentsReducer from "../features/Comments/commentsSlice.ts";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postsReducer,
        comments: commentsReducer,
    }
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;   
export const useAppDispatch = useDispatch<AppDispatch>;

export default store;