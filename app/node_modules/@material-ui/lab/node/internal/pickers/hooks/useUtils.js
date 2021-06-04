"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUtils = useUtils;
exports.useNow = useNow;

var React = _interopRequireWildcard(require("react"));

var _LocalizationProvider = require("../../../LocalizationProvider");

// TODO uncomment when syntax will be allowed by next babel
function checkUtils(utils)
/* :asserts utils is MuiPickersAdapter */
{
  if (!utils) {
    throw new Error('Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.');
  }
}

function useUtils() {
  const utils = React.useContext(_LocalizationProvider.MuiPickersAdapterContext);
  checkUtils(utils);
  return utils;
}

function useNow() {
  const utils = useUtils();
  const now = React.useRef(utils.date());
  return now.current;
}