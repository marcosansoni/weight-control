import axios from 'axios';
import { select } from 'redux-saga/effects';
import sessionSelector from '../../state/common/selectors/sessionSelector';

function* getData({
  url,
  data,
}) {
  // Get the session used for api call
  const { token } = yield select(sessionSelector);

  return yield axios.get(
    url,
    {
      headers: {
        ...(token && { token }),
        ...data,
      },
    },
  )
    .then((response) => response)
    // .then((res) => res)
    .catch((err) => err.response);
}

export default getData;
