import { useSelector } from 'react-redux';

const homeErrorSelector = (state) => state?.home?.errors;

export const useHomeError = () => useSelector(homeErrorSelector);

export default homeErrorSelector;
