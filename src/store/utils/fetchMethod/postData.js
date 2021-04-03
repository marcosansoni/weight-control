import axios from 'axios';

function* postData({ url, data }) {
  // Get the session used for api call

  return yield axios(
    {
      url,
      method: 'POST',
      headers: {
        // session
      },
      data,
    },
  )
    .then((response) => response)
    .catch((err) => err.response);
}

export default postData;
