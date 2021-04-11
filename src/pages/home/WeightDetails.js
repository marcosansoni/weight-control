import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import { Color } from '../../theme/ColorSchema';

const StyledContent = styled(DialogContent)`
  padding: 16px 0;
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 450px;
    max-width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 16px;
  align-items: baseline;
`;

const Name = styled.div`
  font-weight: 550;
  font-size: 18px;
  width: 185px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
`;

const StyledIconButton = styled(IconButton)`
  position: absolute !important;
  top: 8px;
  right: 8px;
`;

const WeightDetails = (props) => {
  const {
    id,
    onClose,
    open,
    onEdit,
    onDelete,
  } = props;
  const { t } = useTranslation();

  const date = '11/01/1995';

  const [note, setNote] = useState('Lorem ipsum');
  const [weight, setWeight] = useState(512);

  console.log(id, onDelete);

  return (
    <StyledDialog onClose={onClose} open={open} maxWidth="lg">
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
          <div>{date}</div>
        </Row>
        <Row>
          <Name>{t('home.rows.details.note')}</Name>
          <TextField
            multiline
            fullWidth
            label={t('home.rows.details.note')}
            variant="outlined"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Row>
        <Row>
          <Name>{t('home.rows.details.weight')}</Name>
          <TextField
            fullWidth
            label={t('home.rows.details.weight')}
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Row>
      </StyledContent>
      <DialogActions style={{ height: 64 }}>
        <LoadingButton
          pending={false}
          variant="contained"
          color="primary"
          onClick={onEdit}
        >
          {t('home.rows.details.primary')}
        </LoadingButton>
      </DialogActions>
    </StyledDialog>
  );
};

WeightDetails.propTypes = {
  id: PropTypes.number,
  open: PropTypes.bool,
  onEdit: PropTypes.func,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

WeightDetails.defaultProps = {
  id: undefined,
  open: undefined,
  onEdit: undefined,
  onClose: undefined,
  onDelete: undefined,
};

export default WeightDetails;
