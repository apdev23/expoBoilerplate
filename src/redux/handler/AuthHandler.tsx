import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    loginFailure,
    loginLoading,
    loginSuccess,
} from '../slice/AuthSlice';
import { url } from '../../api/Url';
import request from '../../api/ApiRequest';

export function* loginHandler(action: any) {

    const data = JSON.stringify(action.payload);

    const config = {
        method: 'POST',
        // url: url.loginUrl,
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        yield put(loginLoading());
        const response: { data: any } = yield call(request, config);
        yield put(loginSuccess(response.data));
    } catch (e: any) {
        console.log(e, "Error in the request");

        if (e.response) {
            yield put(loginFailure(e.response.data?.message || 'Error in login!'));
        } else {
            yield put(loginFailure('An unexpected error occurred.'));
        }
    }
}

