import { createSelector } from 'reselect';
import moment from 'moment';
import weightByIdSelector from './weightByIdSelector';

const dailyWeightSelector = (momentDate) => createSelector(
  weightByIdSelector,
  (weights) => Object.values(weights || {}).find((w) => momentDate
    .diff(moment(w.date), 'day') === 0)?.weight,
);

export default dailyWeightSelector;
