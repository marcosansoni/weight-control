import { takeLatest } from 'redux-saga/effects';
import { actionStatusRequest } from '../../constants/ActionStatus';
import { GET_HOME } from './actionCreator/getHomeActionCreator';
import getHomeWorker from './worker/getHomeWorker';
import { POST_WEIGHT } from './actionCreator/postWeightActionCreator';
import postWeightWorker from './worker/postWeightWorker';
import { DELETE_WEIGHT } from './actionCreator/deleteWeightActionCreator';
import deleteWeightWorker from './worker/deleteWeightWorker';

const homeWatcher = [
  takeLatest(actionStatusRequest(GET_HOME), getHomeWorker),
  takeLatest(actionStatusRequest(POST_WEIGHT), postWeightWorker),
  takeLatest(actionStatusRequest(DELETE_WEIGHT), deleteWeightWorker),
];

export default homeWatcher;
