import { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Color } from '../../theme/ColorSchema';

const PlusIcon = (props) => {
  const { color, size } = props;
  const theme = useTheme();

  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"
        fill={theme[color]}
      />
    </svg>
  );
};

PlusIcon.propTypes = {
  /** Color of the icon */
  color: PropTypes.string,
  /** Size of the icon */
  size: PropTypes.number,
};

PlusIcon.defaultProps = {
  color: Color.TEXT_DARK,
  size: 32,
};

export default PlusIcon;
