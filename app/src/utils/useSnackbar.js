/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const useSnackbar = (notification, resetNotificationActionCreator, onSnackbarOpen) => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  useEffect(() => () => {
    if (notification?.length) dispatch(resetNotificationActionCreator());
  }, []);

  useEffect(() => {
    if (notification?.length) {
      setSnackbarOpen(true);
      setSnackbarMessage(notification[0]?.message);
      onSnackbarOpen?.();
    }
  }, [notification]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(resetNotificationActionCreator());
  };

  return () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snackbarOpen}
      onClose={handleSnackbarClose}
      TransitionComponent={(p) => (<Slide {...p} direction="up" />)}
      message={snackbarMessage}
      autoHideDuration={3000}
    />
  );
};

export default useSnackbar;
