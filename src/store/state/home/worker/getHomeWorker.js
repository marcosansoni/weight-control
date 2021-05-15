import { put } from 'redux-saga/effects';
import getWeightSubWorker from './subworker/getWeightSubWorker';
import getHomeErrorActionCreator from '../actionCreator/getHomeErrorActionCreator';
import getHomeSuccessActionCreator from '../actionCreator/getHomeSuccessActionCreator';

function* getHomeWorker() {
  const {
    errors,
    result,
  } = yield getWeightSubWorker();

  if (errors) return yield put(getHomeErrorActionCreator(errors));

  return yield put(getHomeSuccessActionCreator(result?.weightById));
}

export default getHomeWorker;
