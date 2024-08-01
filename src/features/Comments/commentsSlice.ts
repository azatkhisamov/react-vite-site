import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "../../app/store";
import { requestCommentsForPost } from "../api/api";
import { sub } from "date-fns";
import { getRandomInt } from "../helpers/helpers";

type commentType = {
    postId: number,
    id: number | string,
    name: string,
    email: string,
    body: string,
    date?: string,
}

export const fetchComments = createAsyncThunk<commentType[], number | string, { rejectedMeta: unknown }>(
    'comments/fetchComments',
    async (postId: number | string) => {
        return await requestCommentsForPost(postId);
    }
)
const commentsAdapter = createEntityAdapter({
    selectId: (comment: commentType) => comment.id,
    sortComparer: (a: commentType, b: commentType) => b.date!.localeCompare(a.date!),
})
const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: {
            reducer: (state, action: PayloadAction<commentType>) => {
                commentsAdapter.addOne(state, action.payload);
            },
            prepare: (body: Omit<commentType, 'id'>) => {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        ...body
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            action.payload.map((comment) => {
                comment.date = sub(new Date(), {minutes: getRandomInt(100)}).toISOString();
            })
            commentsAdapter.addMany(state, action.payload)
            // state.comments = state.comments.concat(action.payload);
        })
    }
})

export const { addComment } = commentsSlice.actions;
const {selectAll} = commentsAdapter.getSelectors((state: AppState) => state.comments);
export const selectCommentsForPost = createSelector(
    [selectAll, (state, postId) => postId], 
    (comments, postId) => comments.filter(comment => comment.postId === postId)
)
export default commentsSlice.reducer;