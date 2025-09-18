import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    photoLoading,
    photoSuccess,
    photoFailure
} from '../slice/PhotosSlice';
import { url } from '../../api/Url';
import request from '../../api/ApiRequest';
// import { AUTHENTICATION_VARIABLE } from '@env';

export function* photoDataHandler(action: any) {
    const apiKey = '';

    const page = action.payload.page

    const config = {
        method: 'GET',
        url: `${url.curated}?page=${page}&per_page=20`,
        // data: data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'Pexels/JavaScript',
            Authorization: apiKey,
        },
    };

    try {
        yield put(photoLoading());
        const response: { data: any } = yield call(request, config);
        yield put(photoSuccess(response.data));
    } catch (e: any) {
        console.log(e, "Error in the request");

        if (e.response) {
            yield put(photoFailure(e.response.data?.message || 'Error in Photo fetch!'));
        } else {
            yield put(photoFailure('An unexpected error occurred.'));
        }
    }
}

