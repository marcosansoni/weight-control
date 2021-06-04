import { useSelector } from 'react-redux';

const weightByIdSelector = (state) => state?.home?.weightById;

export const useWeightById = () => useSelector(weightByIdSelector);

export default weightByIdSelector;
