// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { AppState } from "../../app/store"
// import axios from "axios"

// const URL_BASE = "https://jsonplaceholder.typicode.com/";


// type AlbumType = {
//     userId: number,
//     id: number,
//     title: string
// }

// export const fetchAllAlbums = createAsyncThunk<AlbumType[], void, {state: AppState}>('albums/fetchAllAlbums',
//     async () => {
//         const response = axios.get()
//     }
// )

// const initialState = {
//     albums: [] as AlbumType[],
//     viewedAlbum: null as AlbumType | null
// }

// const albumSlice = createSlice({
//     name: 'albums',
//     initialState,
//     reducers: {}
// })

// export default albumSlice.reducer;