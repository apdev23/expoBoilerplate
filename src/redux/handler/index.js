import { all, takeLatest } from 'redux-saga/effects';
import { loginReq } from '../slice/AuthSlice';
import { loginHandler } from './AuthHandler';
import { photoDataHandler } from './PhotoHandler';
import { photoReq } from '../slice/PhotosSlice';

export default function* rootSaga() {
    yield all([
        takeLatest(loginReq.type, loginHandler),
        takeLatest(photoReq.type, photoDataHandler),
    ]);
}
