import { all, fork } from 'redux-saga/effects';
import authSaga from '../features/auth/store/authSaga';
import userSaga from '../features/users/store/userSaga';
import vendorSaga from '../features/vendors/store/vendorSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(vendorSaga),
  ]);
}