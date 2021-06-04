import * as React from 'react';
import { MuiPickersAdapterContext } from '../../../LocalizationProvider'; // Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future

// TODO uncomment when syntax will be allowed by next babel
function checkUtils(utils)
/* :asserts utils is MuiPickersAdapter */
{
  if (!utils) {
    throw new Error('Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.');
  }
}

export function useUtils() {
  var utils = React.useContext(MuiPickersAdapterContext);
  checkUtils(utils);
  return utils;
}
export function useNow() {
  var utils = useUtils();
  var now = React.useRef(utils.date());
  return now.current;
}