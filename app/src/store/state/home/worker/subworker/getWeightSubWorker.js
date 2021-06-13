import i18n from 'i18next';
import getData from '../../../../utils/fetchMethod/getData';
import Endpoint, { urlFactory } from '../../../../constants/Endpoint';
import EndpointStatus from '../../../../constants/EndpointStatus';
import LoginErrorCode from '../../constants/LoginErrorCode';
import Weight from '../../../../../entities/Weight';
import ErrorCode from '../../../../constants/ErrorCode';
import Notification from '../../../../../entities/Notification';

function* getWeightSubWorker() {
  const response = yield getData({
    url: urlFactory(Endpoint.WEIGHT),
  });

  const {
    data,
    status,
  } = response || {};

  if (status === EndpointStatus.NOT_FOUND) {
    return {
      errors:
        [new Notification({
          message: i18n.t('home.snackbar.notFound'),
          code: LoginErrorCode.NOT_FOUND,
        })],
    };
  }

  if (status === EndpointStatus.BAD_REQUEST) {
    return {
      errors:
        [new Notification({
          message: data.errors?.[0]?.description,
          code: LoginErrorCode.NOT_FOUND,
        })],
    };
  }

  if (status === EndpointStatus.SUCCESS) {
    const weightById = {};
    (data?.result?.entities || []).forEach((w) => {
      weightById[w.id] = new Weight(w);
    });
    return { result: { weightById } };
  }

  // Generic errorCode
  return { errors: [new Notification({ code: ErrorCode.DEFAULT })] };
}

export default getWeightSubWorker;
