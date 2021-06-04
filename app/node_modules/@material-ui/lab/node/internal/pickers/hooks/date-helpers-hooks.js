"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useParsedDate = useParsedDate;
exports.useNextMonthDisabled = useNextMonthDisabled;
exports.usePreviousMonthDisabled = usePreviousMonthDisabled;
exports.useMeridiemMode = useMeridiemMode;

var React = _interopRequireWildcard(require("react"));

var _useUtils = require("./useUtils");

var _timeUtils = require("../time-utils");

function useParsedDate(possiblyUnparsedValue) {
  const utils = (0, _useUtils.useUtils)();
  return React.useMemo(() => typeof possiblyUnparsedValue === 'undefined' ? undefined : utils.date(possiblyUnparsedValue), [possiblyUnparsedValue, utils]);
}

function useNextMonthDisabled(month, {
  disableFuture,
  maxDate
}) {
  const utils = (0, _useUtils.useUtils)();
  return React.useMemo(() => {
    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);
}

function usePreviousMonthDisabled(month, {
  disablePast,
  minDate
}) {
  const utils = (0, _useUtils.useUtils)();
  return React.useMemo(() => {
    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);
}

function useMeridiemMode(date, ampm, onChange) {
  const utils = (0, _useUtils.useUtils)();
  const meridiemMode = (0, _timeUtils.getMeridiem)(date, utils);
  const handleMeridiemChange = React.useCallback(mode => {
    const timeWithMeridiem = (0, _timeUtils.convertToMeridiem)(date, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, 'shallow');
  }, [ampm, date, onChange, utils]);
  return {
    meridiemMode,
    handleMeridiemChange
  };
}