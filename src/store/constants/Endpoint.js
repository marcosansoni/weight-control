const Endpoint = {
  LOGIN: '/session/login',
  LOGOUT: '/logout',
  REGISTER: '/session/register',
  WEIGHT: '/weight',
};

const BASE_PATH = process.env.REACT_APP_BASE_PATH;

export const urlFactory = (endpoint = '') => BASE_PATH + endpoint;

export default Endpoint;
