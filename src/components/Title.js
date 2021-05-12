import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Color } from '../theme/ColorSchema';
import MediaQuerySelector from '../constants/responsive/MediaQuerySelector';

const Container = styled.div`
  display: flex;
  align-items: baseline;
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  
  ${MediaQuerySelector.SMALL}{
    flex-direction: column;
  }
`;

const Bold = styled.div`
  margin-right: 8px;
  font-weight: 600;
  font-size: 24px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme[Color.SUBTITLE]};

  ${MediaQuerySelector.SMALL}{
    margin: 8px 0;
  }
`;

const Title = (props) => {
  const { title, subtitle } = props;

  return (
    <Container>
      <Bold>{title}</Bold>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Title.defaultProps = {
  title: undefined,
  subtitle: undefined,
};

export default Title;
