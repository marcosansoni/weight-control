import styled from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Color } from '../../../theme/ColorSchema';
import Title from '../../../components/Title';
import WeightFilterDialog from './WeightFilterDialog';

const Container = styled.div`
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  display: flex;
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};;
`;

const More = styled.span`
  font-weight: 550;
  cursor: pointer;
`;

const WeightFilter = (props) => {
  const {
    startDate,
    endDate,
    showLabel,
    onChangeLabelVisibility,
    onChangeStartDate,
    onChangeEndDate,
  } = props;

  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const { t } = useTranslation();

  return (
    <Container>
      <WeightFilterDialog
        startDate={startDate}
        onChangeStartDate={onChangeStartDate}
        endDate={endDate}
        onChangeEndDate={onChangeEndDate}
        showLabel={showLabel}
        onChangeLabelVisibility={onChangeLabelVisibility}
        open={openFilterDialog}
        onClose={() => setOpenFilterDialog(false)}
      />
      <Title
        title={t('home.weights')}
        subtitle={(
          <Subtitle>
            {t('home.filters.descriptionDate', {
              start: startDate.format('DD/MM/YYYY'),
              end: endDate.format('DD/MM/YYYY'),
            })}
            {showLabel ? `, ${t('home.filters.descriptionLabel')}. ` : '. '}
            <More onClick={() => setOpenFilterDialog(true)}>{t('home.filters.allFilters')}</More>
          </Subtitle>
        )}
      />
    </Container>
  );
};

WeightFilter.propTypes = {
  startDate: PropTypes.instanceOf(moment),
  onChangeStartDate: PropTypes.func,
  endDate: PropTypes.instanceOf(moment),
  onChangeEndDate: PropTypes.func,
  showLabel: PropTypes.bool,
  onChangeLabelVisibility: PropTypes.func,
};

WeightFilter.defaultProps = {
  startDate: undefined,
  endDate: undefined,
  onChangeStartDate: undefined,
  onChangeEndDate: undefined,
  showLabel: undefined,
  onChangeLabelVisibility: undefined,
};

export default WeightFilter;
