import { useMemo } from 'react';
import moment from 'moment';
import { useWeightById } from '../store/state/home/selectors/weightByIdSelector';

const compareFunction = (a, b) => (moment(a.date)
  .isBefore(b.date) ? 1 : -1);

const useOrderedWeights = () => {
  const weights = useWeightById();

  return useMemo(() => (
    Object.values(weights) || []).sort(compareFunction), [weights]);
};

export default useOrderedWeights;
