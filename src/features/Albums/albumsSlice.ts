import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../app/store"
import { requestAlbumsForUser, requestAllAlbums, requestOneAlbum } from "../api/api";

export type AlbumType = {
    userId: number,
    id: number,
    title: string
}

export const albumAdapter = createEntityAdapter({
    selectId: (album: AlbumType) => album.id,
    sortComparer: (a: AlbumType, b: AlbumType) => a.id - b.id,
})

const initialState = albumAdapter.getInitialState({
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'error',
})

export const fetchAlbumsForUser = createAsyncThunk<AlbumType[], number, { state: AppState }>('albums/fetchAlbumsForUser',
    async (userId) => {
        return await requestAlbumsForUser(userId);
    }
)

export const fetchAllAlbums = createAsyncThunk<AlbumType[], void, { state: AppState }>('albums/fetchAllAlbums',
    async () => {
        return await requestAllAlbums();
    }
)

export const fetchOneAlbum = createAsyncThunk<AlbumType | string | undefined, number, { state: AppState }>('albums/fetchOneAlbum',
    async (albumId) => {
        return await requestOneAlbum(albumId);
    }
)

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        removeAlbum: (state, action) => {
            albumAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumsForUser.fulfilled, (state, action) => {
            albumAdapter.addMany(state, action.payload);
        })
        .addCase(fetchAllAlbums.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllAlbums.fulfilled, (state, action) => {
            state.status = 'succeeded';
            albumAdapter.addMany(state, action.payload);
        })
        .addCase(fetchOneAlbum.fulfilled, (state, action) => {
            if (action.payload instanceof Object) {
                albumAdapter.addOne(state, action.payload);
            }
        })
    }
})

export const { removeAlbum } = albumSlice.actions;
export const {
    selectAll: selectAlbums,
    selectIds: selectAlbumsIds,
    selectById: selectAlbumById,
} = albumAdapter.getSelectors((state: AppState) => state.albums);
export const selectAlbumsForUsers = createSelector(
    [selectAlbums, (state: AppState, userId) => state.users.entities[userId]],
    (albums, user) => albums.filter(album => album.userId === user.id)
)
export const albumsStatus = (state: AppState) => state.albums.status;
export const selectAlbumStatus = (state: AppState) => state.albums.status;
export default albumSlice.reducer;