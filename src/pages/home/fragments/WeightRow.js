import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Color } from '../../../theme/ColorSchema';
import MediaQuerySelector from '../../../constants/responsive/MediaQuerySelector';

const Container = styled.div`
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  
  :hover{
    background-color: ${(p) => p.theme[Color.BORDER]};
  }
  
  ${MediaQuerySelector.MEDIUM_AND_SMALL}{
    padding: 16px 0;
  }
`;

const Date = styled.div`
  font-size: 18px;
  height: 100%;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
  font-weight: 550;
  
  ${MediaQuerySelector.MEDIUM}{
    font-size: 16px;
    font-weight: 400;
  }
  
`;

const Note = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme[Color.SUBTITLE]};
  padding: 0 16px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.div`
  font-size: 24px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
  font-weight: 700;
`;

const Side = styled.div`
  display: flex;
  width: 100%;
  align-items: baseline;
  overflow: hidden;
`;

const Separator = styled.div`
  height: 2px;
  border-radius: 8px;
  width: 100%;
  background-color: ${(p) => p.theme[Color.TEXT_LIGHT]};
`;

const WeightRow = (props) => {
  const {
    date,
    note,
    value,
    onClick,
    last,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <Container onClick={onClick}>
        <Side>
          <Date>{date}</Date>
          <Note>{note || t('home.rows.noteUnavailable')}</Note>
        </Side>
        <Value>{value}</Value>
      </Container>
      {!last && (<Separator />)}
    </>
  );
};

WeightRow.propTypes = {
  date: PropTypes.string,
  value: PropTypes.string,
  note: PropTypes.string,
  last: PropTypes.bool,
  onClick: PropTypes.func,
};

WeightRow.defaultProps = {
  date: undefined,
  last: false,
  value: undefined,
  note: undefined,
  onClick: undefined,
};

export default WeightRow;
