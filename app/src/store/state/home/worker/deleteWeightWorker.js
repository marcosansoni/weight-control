import { put } from 'redux-saga/effects';
import i18n from 'i18next';
import Endpoint, { urlFactory } from '../../../constants/Endpoint';
import EndpointStatus from '../../../constants/EndpointStatus';
import LoginErrorCode from '../constants/LoginErrorCode';
import ErrorCode from '../../../constants/ErrorCode';
import getWeightSubWorker from './subworker/getWeightSubWorker';
import deleteWeightErrorActionCreator from '../actionCreator/deleteWeightErrorActionCreator';
import deleteData from '../../../utils/fetchMethod/deleteData';
import deleteWeightSuccessActionCreator from '../actionCreator/deleteWeightSuccessActionCreator';
import Notification from '../../../../entities/Notification';

function* deleteWeightWorker(action) {
  const { id } = action.payload || {};

  const response = yield deleteData({
    url: urlFactory(`${Endpoint.WEIGHT}/${id}`),
  });

  const {
    data,
    status,
  } = response || {};

  if (status === EndpointStatus.NOT_FOUND) {
    return yield put(deleteWeightErrorActionCreator([new Notification({
      message: i18n.t('home.snackbar.notFound'),
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.BAD_REQUEST) {
    return yield put(deleteWeightErrorActionCreator([new Notification({
      message: data.errors?.[0],
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.SUCCESS) {
    const {
      errors,
      result,
    } = yield getWeightSubWorker();
    if (errors) {
      return yield put(deleteWeightErrorActionCreator(errors));
    }

    const notifications = [new Notification({ message: i18n.t('home.snackbar.deleteSuccess') })];

    return yield put(deleteWeightSuccessActionCreator(result?.weightById, notifications));
  }

  // Generic errorCode
  return yield put(deleteWeightErrorActionCreator([new Notification({ code: ErrorCode.DEFAULT })]));
}

export default deleteWeightWorker;
