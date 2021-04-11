import { all } from 'redux-saga/effects';
import authenticationWatcher from '../state/authentication/authenticationWatcher';

export default function* rootSaga() {
  yield all([
    ...authenticationWatcher,
  ]);
}
