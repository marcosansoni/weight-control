import { createSelector } from 'reselect';
import moment from 'moment';
import weightByIdSelector from './weightByIdSelector';

const compareFunction = (a, b) => (moment(a.date)
  .isBefore(b.date) ? 1 : -1);

const sortedWeightSelector = createSelector(
  weightByIdSelector,
  (weights) => Object.values(weights || {})
    .sort(compareFunction),
);

export default sortedWeightSelector;
