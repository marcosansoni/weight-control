import styled from 'styled-components';
import Title from '../components/Title';
import { Color } from '../theme/ColorSchema';
import Card from '../components/Card';
import CalendarIcon from '../icons/CalendarIcon';

const Container = styled.div`
  padding: 32px;
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -24px;
`;

const Home = () => {
  console.log('Home');
  return (
    <Container>
      <Title title="Bentornato Marco!" subtitle="Non hai ancora aggiunto il tuo peso. Fallo subito!" />
      <CardContainer>
        <Card title={"Today's weight"} value={92.5} icon={(<CalendarIcon />)} />
        <Card title="Last week" value={100.4} icon={(<CalendarIcon />)} />
      </CardContainer>
    </Container>
  );
};

export default Home;
