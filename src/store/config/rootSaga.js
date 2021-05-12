import { all } from 'redux-saga/effects';
import authenticationWatcher from '../state/authentication/authenticationWatcher';
import homeWatcher from '../state/home/homeWatcher';

export default function* rootSaga() {
  yield all([
    ...authenticationWatcher,
    ...homeWatcher,
  ]);
}
