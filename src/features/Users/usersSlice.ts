import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import axios from "axios";

const URL_BASE = "https://jsonplaceholder.typicode.com/";

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
    company: CompanyType
}

const initialState = {
    users: [] as Array<UserType>,
    status: "idle",
    error: null as string | null | undefined
}

export const fetchUsers = createAsyncThunk<UserType[], void, {rejectedMeta: unknown}>("users/fetchUsers", async () => {
    const response = await axios.get(`${URL_BASE}/users`);
    return response.data;
}) 

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = "succeeded";
            
            state.users = state.users.concat(action.payload);
            // debugger;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export const seleсtUsers = (state: AppState) => state.users.users;
export const seleсtUsersStatus = (state: AppState) => state.users.status;

export default usersSlice.reducer;