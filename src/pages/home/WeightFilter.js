import styled from 'styled-components';
import React from 'react';
import { Color } from '../../theme/ColorSchema';
import Title from '../../components/Title';

const Container = styled.div`
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  display: flex;
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${(p) => p.theme[Color.TEXT_DARK]}; ;
`;

const More = styled.span`
  font-weight: 550;
  cursor: pointer;
`;

const WeightFilter = (props) => {
  console.log(props);

  return (
    <Container>
      <Title
        title="Weights"
        subtitle={(
          <Subtitle>
            Filtered for last week. &nbsp;
            <More>More filter</More>
          </Subtitle>
      )}
      />
    </Container>
  );
};

export default WeightFilter;
