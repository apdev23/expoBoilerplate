import { createSlice } from "@reduxjs/toolkit";

const PhotosSlice = createSlice({
    name: 'photo',
    initialState: {
        photoData: [],
        photoDataIsLoading: false,
        photoDataErrorMsg: null,

    },
    reducers: {
        photoReq: (state, action) => {
        },
        photoSuccess: (state, action) => {
            state.photoData = action.payload;
            state.photoDataIsLoading = false;
            state.photoDataErrorMsg = null;
        },
        photoFailure: (state, action) => {
            state.photoDataIsLoading = false;
            state.photoDataErrorMsg = action.payload;
        },
        photoLoading: (state) => {
            state.photoDataIsLoading = true
            state.photoDataErrorMsg = null;
        },
        photoClear: (state) => {
            state.photoData = [];
            state.photoDataIsLoading = false;
            state.photoDataErrorMsg = null;
        },
    }
})

export const {
    photoClear,
    photoFailure,
    photoLoading,
    photoReq,
    photoSuccess
} = PhotosSlice.actions
export default PhotosSlice.reducer