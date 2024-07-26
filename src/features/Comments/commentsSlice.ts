import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AppState } from "../../app/store";

const URL_BASE = "https://jsonplaceholder.typicode.com/";

type commentsType = {
    postId: number,
    id: number | string,
    name: string,
    email: string,
    body: string,
}
const initialState = {
    comments: [] as commentsType[]
}

export const fetchComments = createAsyncThunk<commentsType[], number, {rejectedMeta: unknown}>(
    'comments/fetchComments', async (postId: number) => {
        const response = await axios.get(`${URL_BASE}comments?postId=${postId}`);
        return response.data;
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: {
            reducer: (state, action: PayloadAction<commentsType>) => {
                state.comments.push(action.payload);
            },
            prepare: (body: Omit<commentsType, 'id'>) => {
                // debugger
                return {
                    payload: {
                        id: nanoid(),
                        ...body
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = state.comments.concat(action.payload);
        })
    }
})

export const {addComment} = commentsSlice.actions;
export const selectComments = (state: AppState) => state.comments.comments;
export default commentsSlice.reducer;