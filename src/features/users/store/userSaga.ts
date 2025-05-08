import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
} from './userSlice';
import { showToast } from '../../../store/toastSlice';
import { api } from '../../../services/api';
import { withLoader } from '../../../store/sagaMiddleware';
import { USER_MESSAGES } from '../messages';
import { TOAST_TYPES, TOAST_MESSAGES } from '../../../constants/toast';

function* fetchUsersSaga() {
  try {
    const users = yield* withLoader('FETCH_USERS', function* () {
      return yield api.users.getAll();
    }, USER_MESSAGES.LOADING.USERS);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : USER_MESSAGES.ERROR.UNKNOWN;
    yield put(fetchUsersFailure(errorMessage));
    yield put(showToast({ message: errorMessage, type: TOAST_TYPES.ERROR }));
  }
}

function* createUserSaga(action: PayloadAction<{ email: string; password: string; role: string }>) {
  try {
    const newUser = yield* withLoader('CREATE_USER', function* () {
      return yield api.users.create({
        email: action.payload.email,
        role: action.payload.role,
      });
    }, USER_MESSAGES.CREATING.USER);
    yield put(createUserSuccess(newUser));
    yield put(showToast({ message: TOAST_MESSAGES.SUCCESS.CREATE, type: TOAST_TYPES.SUCCESS }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : USER_MESSAGES.ERROR.UNKNOWN;
    yield put(createUserFailure(errorMessage));
    yield put(showToast({ message: errorMessage, type: TOAST_TYPES.ERROR }));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsers.type, fetchUsersSaga);
  yield takeLatest(createUser.type, createUserSaga);
}