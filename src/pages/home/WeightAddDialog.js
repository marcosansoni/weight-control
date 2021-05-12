import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Color } from '../../theme/ColorSchema';
import { useFetchType } from '../../store/state/common/selectors/fetchSelector';
import { POST_WEIGHT } from '../../store/state/home/actionCreator/postWeightActionCreator';
import { useHomeError } from '../../store/state/home/selectors/homeErrorSelector';
import usePrevious from '../../utils/usePrevious';
import postWeightErrorActionCreator
  from '../../store/state/home/actionCreator/postWeightErrorActionCreator';
import MediaQuerySelector from '../../constants/responsive/MediaQuerySelector';

const StyledContent = styled(DialogContent)`
  padding: 16px 24px 0 !important;
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 450px;
    max-width: 100%;

    ${MediaQuerySelector.SMALL}{
      width: 100%;
      max-width: 100%;
    }
  }
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 16px;
  align-items: baseline;

  :last-child {
    padding-bottom: 0;
  }
`;

const Name = styled.div`
  font-weight: 550;
  font-size: 18px;
  min-width: 126px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
`;

const StyledIconButton = styled(IconButton)`
  position: absolute !important;
  top: 8px;
  right: 8px;
`;

const ContainerInput = styled.div`
  width: 100%;
`;

const initialValues = (date) => ({
  date,
  note: undefined,
  weight: undefined,
});

const validationSchema = (t) => Yup.object({
  weight: Yup.number(t('home.rows.add.errors.weight.default'))
    .required(t('home.rows.add.errors.weight.required')),
});

const DateFormat = 'YYYY-MM-DD';

const WeightAddDialog = (props) => {
  const {
    onClose,
    open,
    defaultDate,
    onPrimary,
    onOpenSnackbar,
    onChangeSnackbarMessage,
  } = props;
  const { t } = useTranslation();
  const fetching = useFetchType(POST_WEIGHT);
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(MediaQuerySelector.SMALL);

  const error = useHomeError();

  const validationSchemaFormik = useMemo(() => validationSchema(t), []);
  const initialValuesFormik = useMemo(() => (
    initialValues((defaultDate || moment()).format(DateFormat))),
  [defaultDate]);

  const prevFetching = usePrevious(fetching);

  useEffect(() => {
    if (!fetching && prevFetching !== undefined) {
      onClose();
      if (!error?.length) {
        onOpenSnackbar();
        onChangeSnackbarMessage('Weight successful added');
      }
    }
  }, [fetching]);

  useEffect(() => () => {
    dispatch(postWeightErrorActionCreator([]));
  }, []);

  const handleEdit = (formik) => {
    const { date, weight, note } = formik || {};
    const dateFormatted = moment(date, DateFormat).format('DD/MM/YYYY');
    onPrimary(dateFormatted, weight, note);
  };

  if (!open) return null;

  return (
    <Formik
      initialValues={initialValuesFormik}
      validationSchema={validationSchemaFormik}
      onSubmit={handleEdit}
    >
      {(formik) => (
        <StyledDialog onClose={onClose} open={open} fullScreen={fullScreen}>
          <DialogTitle onClose={onClose}>
            {t('home.rows.add.title')}
            {onClose ? (
              <StyledIconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
              </StyledIconButton>
            ) : null}
          </DialogTitle>
          <StyledContent dividers>
            <Row>
              <Name>{t('home.rows.add.date')}</Name>
              <ContainerInput>
                <TextField
                  type="date"
                  fullWidth
                  name="date"
                  variant="outlined"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('date')}
                />
              </ContainerInput>
            </Row>
            <Row>
              <Name>{t('home.rows.add.note')}</Name>
              <ContainerInput>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="note"
                  variant="outlined"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('note')}
                />
              </ContainerInput>
            </Row>
            <Row>
              <Name>{t('home.rows.add.weight')}</Name>
              <ContainerInput style={{ height: 92 }}>
                <TextField
                  type="number"
                  fullWidth
                  name="weight"
                  variant="outlined"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('weight')}
                  error={formik.touched.weight && Boolean(formik.errors.weight)}
                  helperText={formik.touched.weight && formik.errors.weight}
                />
              </ContainerInput>
            </Row>
          </StyledContent>
          <DialogActions style={{
            height: 64,
            position: 'relative',
          }}
          >
            <Button
              onClick={onClose}
            >
              {t('home.rows.add.secondary')}
            </Button>
            <LoadingButton
              pending={fetching}
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              {t('home.rows.add.primary')}
            </LoadingButton>
          </DialogActions>
        </StyledDialog>
      )}
    </Formik>
  );
};

WeightAddDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onPrimary: PropTypes.func,
  defaultDate: PropTypes.any,
  onOpenSnackbar: PropTypes.func,
  onChangeSnackbarMessage: PropTypes.func,
};

WeightAddDialog.defaultProps = {
  open: undefined,
  onClose: undefined,
  onPrimary: undefined,
  defaultDate: undefined,
  onOpenSnackbar: undefined,
  onChangeSnackbarMessage: undefined,
};

export default WeightAddDialog;
