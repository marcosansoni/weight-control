import axios from 'axios';

function* getData({ url, data }) {
  // Get the session used for api call

  return yield axios.get(
    url,
    {
      headers: {
        // session
        ...data,
      },
    },
  )
    .then((response) => response)
    // .then((res) => res)
    .catch((err) => err.response);
}

export default getData;
