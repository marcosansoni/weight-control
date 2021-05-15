import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button, Checkbox,
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
import moment from 'moment';
import { Color } from '../../../theme/ColorSchema';
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

  :last-child {
    padding-bottom: 0;
  }
`;

const Name = styled.div`
  font-weight: 550;
  font-size: 18px;
  min-width: 126px;
  height: 56px;
  display: flex;
  align-items: center;
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

const Subtitle = styled.div`
  padding-bottom: 16px;
  font-size: 16px;
`;

const DateFormat = 'YYYY-MM-DD';

const WeightFilterDialog = (props) => {
  const {
    onClose,
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    onChangeStartDate,
    onChangeEndDate,
    open,
    showLabel: defaultShowLabel,
    onChangeLabelVisibility,
  } = props;
  const { t } = useTranslation();
  const fullScreen = useMediaQuery(MediaQuerySelector.SMALL);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [showLabel, setShowLabel] = useState(defaultShowLabel);

  useEffect(() => {
    if (startDate !== defaultStartDate) setStartDate(defaultStartDate);
  }, [defaultStartDate]);

  useEffect(() => {
    if (endDate !== defaultEndDate) setEndDate(defaultEndDate);
  }, [defaultEndDate]);

  useEffect(() => {
    if (showLabel !== defaultShowLabel) setStartDate(defaultShowLabel);
  }, [defaultShowLabel]);

  const handleApplyFilter = () => {
    onChangeStartDate(startDate);
    onChangeEndDate(endDate);
    onChangeLabelVisibility(showLabel);
    onClose();
  };

  if (!open) return null;

  return (
    <StyledDialog onClose={onClose} open={open} fullScreen={fullScreen}>
      <DialogTitle onClose={onClose}>
        {t('home.filters.title')}
        {onClose ? (
          <StyledIconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </StyledIconButton>
        ) : null}
      </DialogTitle>
      <StyledContent dividers>
        <Subtitle>{t('home.filters.subtitle')}</Subtitle>
        <Row>
          <Name>{t('home.filters.startDate')}</Name>
          <ContainerInput>
            <TextField
              type="date"
              fullWidth
              name="date"
              variant="outlined"
              value={startDate.format(DateFormat)}
              onChange={(e) => setStartDate(moment(e.target.value, DateFormat))}
            />
          </ContainerInput>
        </Row>
        <Row>
          <Name>{t('home.filters.endDate')}</Name>
          <ContainerInput>
            <TextField
              type="date"
              fullWidth
              name="date"
              variant="outlined"
              value={endDate.format(DateFormat)}
              onChange={(e) => setEndDate(moment(e.target.value, DateFormat))}
            />
          </ContainerInput>
        </Row>
        <Subtitle style={{ marginTop: 16 }}>{t('home.filters.graphOptions')}</Subtitle>
        <Row>
          <Name style={{ width: '100%' }}>{t('home.filters.showLabel')}</Name>
          <ContainerInput style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              color="primary"
              checked={showLabel}
              onChange={() => setShowLabel(!showLabel)}
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
          {t('home.rows.details.secondary')}
        </Button>
        <LoadingButton
          pending={false}
          variant="contained"
          color="primary"
          onClick={handleApplyFilter}
        >
          {t('home.rows.details.primary')}
        </LoadingButton>
      </DialogActions>
    </StyledDialog>
  );
};

WeightFilterDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  startDate: PropTypes.instanceOf(moment),
  onChangeStartDate: PropTypes.func,
  endDate: PropTypes.instanceOf(moment),
  onChangeEndDate: PropTypes.func,
  showLabel: PropTypes.bool,
  onChangeLabelVisibility: PropTypes.func,
};

WeightFilterDialog.defaultProps = {
  open: undefined,
  onClose: undefined,
  startDate: undefined,
  endDate: undefined,
  onChangeStartDate: undefined,
  onChangeEndDate: undefined,
  showLabel: undefined,
  onChangeLabelVisibility: undefined,
};

export default WeightFilterDialog;
