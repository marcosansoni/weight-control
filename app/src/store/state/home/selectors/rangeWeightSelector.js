import { createSelector } from 'reselect';
import moment from 'moment';
import sortedWeightSelector from './sortedWeightSelector';

const rangeWeightSelector = (startRangeMoment, endRangeMoment) => createSelector(
  sortedWeightSelector,
  (weights) => weights
    .filter((w) => (
      moment(w.date)
        .diff(startRangeMoment, 'days') >= 0
      && moment(w.date)
        .diff(endRangeMoment, 'days') <= 0
    )),
);

export default rangeWeightSelector;
