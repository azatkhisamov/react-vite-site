import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { requestAllUsers, requestOneUser } from "../api/api";

type AddressType = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoType
}

type GeoType = {
    lat: string,
    lng: string
}

type CompanyType = {
    name: string,
    catchPhrase: string,
    bs: string
}

export type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: AddressType,
    phone: string,
    website: string,
    company: CompanyType,
    friend?: boolean
}

export const fetchAllUsers = createAsyncThunk<UserType[], void, { rejectedMeta: unknown }>("users/fetchAllUsers",
    async () => {
        return await requestAllUsers();
    }
);

export const fetchOneUser = createAsyncThunk<UserType | string | undefined, number | string, { rejectedMeta: unknown }>('users/fetchOneUser',
    async (userId: number | string) => {
        return await requestOneUser(userId);
    }
)

export const usersAdapter = createEntityAdapter({
    selectId: (user: UserType) => user.id,
    sortComparer: (a, b) => a.id - b.id
});
const initialState = usersAdapter.getInitialState({
    status: "idle" as 'idle' | 'loading' | 'succeeded' | 'error',
    error: null as string | null | undefined
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        subscribing: (state, action: PayloadAction<number>) => {
            state.entities[action.payload].friend = !state.entities[action.payload].friend;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.status = "loading";
        })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                usersAdapter.addMany(state, action.payload.map(user => {
                    user.friend = false;
                    return user;
                }));
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            
            .addCase(fetchOneUser.fulfilled, (state, action) => {
                if (action.payload instanceof Object) {
                    action.payload.friend = false;
                    usersAdapter.addOne(state, action.payload);
                }
            })
    }
})

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
} = usersAdapter.getSelectors((state: AppState) => state.users);
export const selectUsersStatus = (state: AppState) => state.users.status;
export const {subscribing} = usersSlice.actions;
export default usersSlice.reducer;