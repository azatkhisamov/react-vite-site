import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import axios from "axios";

const URL_BASE = "https://jsonplaceholder.typicode.com/";
const photosAdapter = createEntityAdapter({
    selectId: (photos: PhotoType) => photos.id,
    sortComparer: (a, b) => a.id - b.id
});
type PhotoType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

export const fetchPhotos = createAsyncThunk<PhotoType[], number, { state: AppState }>('photos/fetchPhotos',
    async (albumId) => {
        const response = await axios.get(`${URL_BASE}photos?albumId=${albumId}`);
        return response.data;
    }
)

const photosSlice = createSlice({
    name: 'photos',
    initialState: photosAdapter.getInitialState(),
    reducers: {
        removePhoto: () => {
            photosAdapter.removeOne;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.fulfilled, (state, action: PayloadAction<PhotoType[]>) => {
            photosAdapter.addMany(state, action.payload);
        })
    }
})

export const { removePhoto} = photosSlice.actions;
export const {
    selectAll: selectPhotos,
    selectById: selectPhoto,
} = photosAdapter.getSelectors((state: AppState) => state.photos);
export const selectPhotosForAlbum = createSelector(
    [selectPhotos, (state: AppState, albumId) => state.albums.entities[albumId]],
    (photos, album) => photos.filter(photo => photo.albumId === album.id)
)
export default photosSlice.reducer;

