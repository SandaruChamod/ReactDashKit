import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';
import { api } from '../../../services/api';
import { withLoader } from '../../../store/sagaMiddleware';
import { AUTH_MESSAGES } from '../messages';

function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const user = yield* withLoader('LOGIN', function* () {
      return yield api.auth.login(action.payload.email, action.payload.password);
    }, AUTH_MESSAGES.SIGNING_IN);
    yield put(loginSuccess(user));
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginFailure(error.message));
    } else {
      yield put(loginFailure(AUTH_MESSAGES.UNKNOWN_ERROR));
    }
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}