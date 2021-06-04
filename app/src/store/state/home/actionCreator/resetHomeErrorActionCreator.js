export const HOME_RESET_ERROR = 'HOME_RESET_ERROR';

const resetHomeErrorActionCreator = () => ({
  type: HOME_RESET_ERROR,
  payload: { errors: [] },
});

export default resetHomeErrorActionCreator;
