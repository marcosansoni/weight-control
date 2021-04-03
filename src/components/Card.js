import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Color } from '../theme/ColorSchema';

const Container = styled.div`
  padding: 16px;
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  display: flex;
  margin: 12px 24px;
  box-shadow: 0 0.25em 0.625em rgba(0,0,0,.15);
  border-radius: 16px;
  justify-content: space-between;
  align-items: flex-end;
  height: 112px;
  width: 280px;
`;

const Left = styled.div`
  display: flex;
  font-size: 18px;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Right = styled.div`
  margin-bottom: -8px;
  display: flex;
  font-size: 32px;
  font-weight: 700;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
  align-items: flex-end;
`;

const Card = (props) => {
  const { icon, title, value } = props;
  return (
    <Container>
      <Left>
        {icon}
        <span>{title}</span>
      </Left>
      <Right>{value}</Right>
    </Container>
  );
};

Card.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  value: PropTypes.string,
};

Card.defaultProps = {
  icon: undefined,
  title: undefined,
  value: undefined,
};

export default Card;
