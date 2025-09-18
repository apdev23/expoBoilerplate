import { combineReducers } from 'redux';
import AuthSlice from './AuthSlice';
import PhotosSlice from './PhotosSlice';

export default combineReducers({
    auth: AuthSlice,
    photo: PhotosSlice,
});