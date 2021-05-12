import { Skeleton } from '@material-ui/core';
import styled from 'styled-components';
import MediaQuerySelector from '../../constants/responsive/MediaQuerySelector';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  height: 100%;
  overflow: hidden;
`;

const Flex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    flex-direction: column;
  }
`;

const Chart = styled.div`
  width: 50%;
  height: 100%;

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    display: none;
  }
`;

const Weights = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 24px;

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    width: 100%;
    padding: 0;
  }
`;

const HomeSkeleton = () => (
  <Container>
    <Skeleton variant="rect" width={200} height={48} />
    <Skeleton variant="text" width={200} height={32} style={{ marginTop: 16 }} />
    <Flex style={{ height: 96 }}>
      <Skeleton
        variant="rect"
        width={164}
        height={64}
        style={{
          marginTop: 16,
          marginRight: 32,
        }}
      />
      <Skeleton variant="rect" width={164} height={64} style={{ marginTop: 16 }} />
    </Flex>
    <Skeleton variant="text" width={200} height={32} style={{ marginTop: 32 }} />
    <Skeleton variant="text" width={248} height={16} style={{ marginTop: 16 }} />
    <Flex>
      <Chart>
        <Skeleton variant="rect" height="100%" width="100%" style={{ marginTop: 16 }} />
      </Chart>
      <Weights>
        {Array.from(Array(100)
          .keys())
          .map((i) => (
            <Skeleton variant="rect" height={48} width="100%" style={{ marginTop: 16 }} key={i} />
          ))}
      </Weights>
    </Flex>
  </Container>
);

export default HomeSkeleton;
