import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Color } from '../../theme/ColorSchema';

const Container = styled.div`
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  padding: 16px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  
  :hover{
    background-color: ${(p) => p.theme[Color.BORDER]};
  }
`;

const Date = styled.div`
  font-size: 18px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
  font-weight: 550;
`;

const Note = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme[Color.SUBTITLE]};
  padding-left: 16px;
`;

const Value = styled.div`
  font-size: 24px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
  font-weight: 700;
`;

const Side = styled.div`
  display: flex;
  align-items: baseline;
`;

const Separator = styled.div`
  height: 2px;
  border-radius: 8px;
  margin-left: 24px;
  width: calc(100% - 48px);
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

  console.log(onClick);

  return (
    <>
      <Container>
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
