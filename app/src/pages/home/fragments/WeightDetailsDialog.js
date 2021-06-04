import React, { useMemo } from 'react';
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
import { Color } from '../../../theme/ColorSchema';
import { useWeightById } from '../../../store/state/home/selectors/weightByIdSelector';
import deleteWeightActionCreator, { DELETE_WEIGHT } from '../../../store/state/home/actionCreator/deleteWeightActionCreator';
import { useFetchType } from '../../../store/state/common/selectors/fetchSelector';
import MediaQuerySelector from '../../../constants/responsive/MediaQuerySelector';

const StyledContent = styled(DialogContent)`
  padding: 16px 24px 0 !important;
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 450px;
    max-width: 100%;

    ${MediaQuerySelector.SMALL} {
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

const TertiaryButton = styled(LoadingButton)`
  position: absolute !important;
  top: 50%;
  transform: translate(0, -50%);
  left: 8px;
`;

const initialValues = (note, weight) => ({
  note,
  weight,
});

const validationSchema = (t) => Yup.object({
  weight: Yup.number(t('home.rows.details.errors.weight.default'))
    .required(t('home.rows.details.errors.weight.required')),
});

const WeightDetailsDialog = (props) => {
  const {
    id,
    onClose,
    open,
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(MediaQuerySelector.SMALL);

  const weights = useWeightById();
  const currentWeight = weights?.[id];

  const fetching = useFetchType(DELETE_WEIGHT);

  const date = useMemo(() => currentWeight?.date, [JSON.stringify(currentWeight)]);
  const note = useMemo(() => currentWeight?.note, [JSON.stringify(currentWeight)]);
  const weight = useMemo(() => currentWeight?.weight, [JSON.stringify(currentWeight)]);

  const validationSchemaFormik = useMemo(() => validationSchema(t), [weight, note]);
  const initialValuesFormik = useMemo(() => initialValues(note, weight), [weight, note]);

  const handleEdit = () => {
    // console.log('submit');
  };

  const handleDelete = () => {
    dispatch(deleteWeightActionCreator(id));
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
            {t('home.rows.details.title')}
            {onClose ? (
              <StyledIconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
              </StyledIconButton>
            ) : null}
          </DialogTitle>
          <StyledContent dividers>
            <Row>
              <Name>{t('home.rows.details.date')}</Name>
              <div>
                {moment(date)
                  .format('DD/MM/YYYY')}
              </div>
            </Row>
            <Row>
              <Name>{t('home.rows.details.note')}</Name>
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
              <Name>{t('home.rows.details.weight')}</Name>
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
            <TertiaryButton
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              pending={fetching}
            >
              {t('home.rows.details.tertiary')}
            </TertiaryButton>
            <Button
              onClick={onClose}
            >
              {t('home.rows.details.secondary')}
            </Button>
            <LoadingButton
              pending={false}
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              {t('home.rows.details.primary')}
            </LoadingButton>
          </DialogActions>
        </StyledDialog>
      )}
    </Formik>
  );
};

WeightDetailsDialog.propTypes = {
  id: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

WeightDetailsDialog.defaultProps = {
  id: undefined,
  open: undefined,
  onClose: undefined,
};

export default WeightDetailsDialog;
