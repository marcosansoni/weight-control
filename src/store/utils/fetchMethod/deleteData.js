import { select } from 'redux-saga/effects';
import axios from 'axios';

function* deleteData({ url, data }) {
  // Get the session used for api call

  return yield axios.delete(url, {
    headers: {
      // session
      ...data,
    },
  })
    .then((response) => response)
    // .then((res) => res)
    .catch((err) => err.response);
}

export default deleteData;
