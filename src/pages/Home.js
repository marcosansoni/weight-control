import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Title from '../components/Title';
import { Color } from '../theme/ColorSchema';
import Card from '../components/Card';
import CalendarIcon from '../assets/icons/CalendarIcon';
import WeightFilter from './home/WeightFilter';
import Chart from './home/Chart';
import WeightRow from './home/WeightRow';
import WeightDetails from './home/WeightDetails';

const Container = styled.div`
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -24px;
  padding-bottom: 16px;
`;

const Left = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Right = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const WeightContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const Home = () => {
  console.log('Home');
  return (
    <Container>
      <WeightDetails open onClose={() => {}} />
      <Title title="Bentornato Marco!" subtitle="Non hai ancora aggiunto il tuo peso. Fallo subito!" />
      <CardContainer>
        <Card title={"Today's weight"} value={92.5} icon={(<CalendarIcon />)} />
        <Card title="Last week" icon={(<CalendarIcon />)} placeholder="No value" />
      </CardContainer>
      <WeightContainer>
        <Left>
          <WeightFilter />
          <Chart />
        </Left>
        <Right>
          <PerfectScrollbar>
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} />
            <WeightRow date="11/11/2011" value={55.6} last />
          </PerfectScrollbar>
        </Right>
      </WeightContainer>
    </Container>
  );
};

export default Home;
