import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Color } from '../theme/ColorSchema';

const Container = styled.div`
  display: flex;
  align-items: baseline;
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
`;

const Bold = styled.div`
  margin-right: 8px;
  font-weight: 700;
  font-size: 28px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
`;

const Subtitle = styled.div`
  font-size: 18px;
  color: ${(p) => p.theme[Color.SUBTITLE]};
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
