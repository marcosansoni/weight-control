import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Color } from '../theme/ColorSchema';
import MediaQuerySelector from '../constants/responsive/MediaQuerySelector';

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
  
  ${MediaQuerySelector.SMALL}{
    height: auto;
    width: 245px;
  }
`;

const Left = styled.div`
  display: flex;
  font-size: 18px;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  ${MediaQuerySelector.SMALL}{
    font-size: 16px;
    font-weight: 550;
  }
`;

const Right = styled.div`
  margin-bottom: -8px;
  display: flex;
  font-size: 32px;
  font-weight: 700;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
  align-items: flex-end;
`;

const NoValue = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: ${(p) => p.theme[Color.SUBTITLE]};
  align-items: flex-end;
  cursor: pointer;
`;

const IconSpan = styled.span`
  ${MediaQuerySelector.SMALL}{
    display: none;
  }
`;

const Card = (props) => {
  const {
    icon, title, value, onClick, placeholder,
  } = props;
  return (
    <Container onClick={onClick}>
      <Left>
        <IconSpan>{icon}</IconSpan>
        <span>{title}</span>
      </Left>
      {value ? (<Right>{value}</Right>) : <NoValue>{placeholder}</NoValue>}
    </Container>
  );
};

Card.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  icon: undefined,
  title: undefined,
  placeholder: undefined,
  value: undefined,
  onClick: undefined,
};

export default Card;
