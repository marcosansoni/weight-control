import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import WeightRow from './WeightRow';
import rangeWeightSelector from '../../../store/state/home/selectors/rangeWeightSelector';
import { Color } from '../../../theme/ColorSchema';

const HeaderShadow = styled.div`
  height: 4px;
  position: absolute;
  top:  -4px;
  left: 0;
  right: 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  z-index: 1;
`;

const FooterShadow = styled.div`
  height: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 9px rgba(0, 0, 0, 0.12);
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  z-index: 10;
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const WeightList = (props) => {
  const {
    startDate,
    endDate,
    onClick,
  } = props;
  const filteredWeights = useSelector(rangeWeightSelector(startDate, endDate));
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [shadowHeader, setShadowHeader] = useState(false);
  const [shadowFooter, setShadowFooter] = useState(false);

  const handleScrollbarVisibility = (element) => {
    if (!element?.clientHeight || !element?.scrollHeight) return;
    if (element.clientHeight < element.scrollHeight && !isScrollbarVisible) {
      setIsScrollbarVisible(true);
      setShadowFooter(true);
      return;
    }
    if (element.clientHeight > element.scrollHeight && isScrollbarVisible) {
      setIsScrollbarVisible(false);
      setShadowFooter(false);
    }
  };

  return (
    <Container>
      {shadowHeader && <HeaderShadow />}
      {shadowFooter && <FooterShadow />}
      <PerfectScrollbar
        containerRef={handleScrollbarVisibility}
        onSync={(e) => handleScrollbarVisibility(e?.element)}
        onYReachStart={() => {
        // shadow on footer if content is scrollable
          setShadowFooter(true);
          // always no shadows on header when it reaches the top
          setShadowHeader(false);
        }}
        onScrollY={() => {
        // shadow on both footer and header if scrollable
          setShadowFooter(true);
          setShadowHeader(true);
        }}
        onYReachEnd={() => {
        // shadow on header if content is scrollable
          setShadowHeader(true);
          // always no shadows on footer when it reaches the top
          setShadowFooter(false);
        }}
        options={{
          suppressScrollX: true,
          maxScrollbarLength: 300,
        }}
      >
        {filteredWeights
          .map((w, index) => (
            <WeightRow
              last={index === filteredWeights.length - 1}
              date={moment(w.date)
                .format('DD/MM/YYYY')}
              value={Number(w.weight)
                .toFixed(1)}
              key={w.id}
              note={w.note}
              onClick={() => onClick(w.id)}
            />
          ))}
      </PerfectScrollbar>
    </Container>
  );
};

WeightList.propTypes = {
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
};

WeightList.defaultProps = {
  startDate: undefined,
  endDate: undefined,
  onClick: undefined,
};

export default WeightList;
