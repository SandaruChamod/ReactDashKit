import { call, put } from 'redux-saga/effects';
import { showLoader, hideLoader } from './loaderSlice';

export function* withLoader<T>(
  action: string,
  saga: () => Generator<any, T, any>,
  message?: string
): Generator<any, T, any> {
  try {
    yield put(showLoader(message));
    const result = yield call(saga);
    yield put(hideLoader());
    return result;
  } catch (error) {
    yield put(hideLoader());
    throw error;
  }
}