import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchVendors,
  fetchVendorsSuccess,
  fetchVendorsFailure,
  createVendor,
  createVendorSuccess,
  createVendorFailure,
} from './vendorSlice';
import { showToast } from '../../../store/toastSlice';
import { api } from '../../../services/api';
import { withLoader } from '../../../store/sagaMiddleware';
import { VENDOR_MESSAGES } from '../constants';
import { CreateVendorPayload } from '../types';
import { TOAST_TYPES, TOAST_MESSAGES } from '../../../constants/toast';

function* fetchVendorsSaga() {
  try {
    const vendors = yield* withLoader('FETCH_VENDORS', function* () {
      return yield api.vendors.getAll();
    }, VENDOR_MESSAGES.LOADING.VENDORS);
    yield put(fetchVendorsSuccess(vendors));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : VENDOR_MESSAGES.ERROR.UNKNOWN;
    yield put(fetchVendorsFailure(errorMessage));
    yield put(showToast({ message: errorMessage, type: TOAST_TYPES.ERROR }));
  }
}

function* createVendorSaga(action: PayloadAction<CreateVendorPayload>) {
  try {
    const newVendor = yield* withLoader('CREATE_VENDOR', function* () {
      return yield api.vendors.create(action.payload);
    }, VENDOR_MESSAGES.CREATING.VENDOR);
    yield put(createVendorSuccess(newVendor));
    yield put(showToast({ message: TOAST_MESSAGES.SUCCESS.CREATE, type: TOAST_TYPES.SUCCESS }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : VENDOR_MESSAGES.ERROR.UNKNOWN;
    yield put(createVendorFailure(errorMessage));
    yield put(showToast({ message: errorMessage, type: TOAST_TYPES.ERROR }));
  }
}

export default function* vendorSaga() {
  yield takeLatest(fetchVendors.type, fetchVendorsSaga);
  yield takeLatest(createVendor.type, createVendorSaga);
}