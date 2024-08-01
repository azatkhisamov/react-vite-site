import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "../../app/store"
import { requestTodos } from "../api/api"

export type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

export const fetchTodos = createAsyncThunk<TodoType[], number, {state: AppState}>('todos/fetchTodos', 
    async (userId: number) => {
        return await requestTodos(userId);
    }
) 

const todosAdapter = createEntityAdapter({
    selectId: (todo: TodoType) => todo.id,
    sortComparer: (a, b) => a.id - b.id,
})

const initialState = todosAdapter.getInitialState({
    status: 'idle' as 'idle' | 'succeeded' | 'loading' | 'error',
})

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        completeTodo: (state, action: PayloadAction<number>) => {
            state.entities[action.payload].completed = true;
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            todosAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: build => {
        build.addCase(fetchTodos.fulfilled, (state, action) => {
            todosAdapter.addMany(state, action.payload);
        })
    }
})

export const {
    selectAll: selectAllTodos,
    selectById: selectOneTodo,
} = todosAdapter.getSelectors((state: AppState) => state.todos);
export const selectTodosForUser = createSelector(
    [selectAllTodos, (state, userId) => userId],
    (todos, userId) => todos.filter(todo => todo.userId === userId)
)
export const {completeTodo, deleteTodo} = todosSlice.actions
export default todosSlice.reducer;