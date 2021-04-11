import axios from 'axios';
import { select } from 'redux-saga/effects';
import sessionSelector from '../../state/common/selectors/sessionSelector';

function* postData({ url, data }) {
  // Get the session used for api call
  const { token } = yield select(sessionSelector);

  return yield axios(
    {
      url,
      method: 'POST',
      headers: {
        ...(token && { session: token }),
      },
      data,
    },
  )
    .then((response) => response)
    .catch((err) => err.response);
}

export default postData;
