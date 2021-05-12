import getData from '../../../../utils/fetchMethod/getData';
import Endpoint, { urlFactory } from '../../../../constants/Endpoint';
import EndpointStatus from '../../../../constants/EndpointStatus';
import Error from '../../../../../entities/Error';
import LoginErrorCode from '../../constants/LoginErrorCode';
import Weight from '../../../../../entities/Weight';
import ErrorCode from '../../../../constants/ErrorCode';

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
        [new Error({
          message: 'Weights not found',
          code: LoginErrorCode.NOT_FOUND,
        })],
    };
  }

  if (status === EndpointStatus.BAD_REQUEST) {
    return {
      errors:
        [new Error({
          message: data.errors?.[0],
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
  return { errors: [new Error({ code: ErrorCode.DEFAULT })] };
}

export default getWeightSubWorker;
