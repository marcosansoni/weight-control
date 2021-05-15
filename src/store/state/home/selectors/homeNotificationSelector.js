import { useSelector } from 'react-redux';

const homeNotificationSelector = (state) => state?.home?.notification;

export const useHomeNotification = () => useSelector(homeNotificationSelector);

export default homeNotificationSelector;
