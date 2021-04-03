import Theme from './Theme';
import Palette from './Palette';

export const Color = {
  BACKGROUND: 'BACKGROUND',
  TEXT_DARK: 'TEXT_DARK',
  TEXT_LIGHT: 'TEXT_LIGHT',
  BORDER: 'BORDER',
  SUBTITLE: 'SUBTITLE',
  PRIMARY_DARK: 'PRIMARY_DARK',
  PRIMARY_LIGHT: 'PRIMARY_LIGHT',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const ColorSchema = {
  [Theme.LIGHT]: {
    [Color.BACKGROUND]: Palette.WHITE,
    [Color.TEXT_DARK]: Palette.BLACK,
    [Color.TEXT_LIGHT]: Palette.GRAY,
    [Color.SUBTITLE]: Palette.GRAY_LIGHT,
    [Color.BORDER]: Palette.GRAY_SUPER_LIGHT,
    [Color.PRIMARY_DARK]: Palette.BLUE_DARK,
    [Color.PRIMARY_LIGHT]: Palette.BLUE_LIGHT,
    [Color.ERROR]: Palette.RED,
    [Color.SUCCESS]: Palette.GREEN,
  },
  [Theme.DARK]: {
    [Color.BACKGROUND]: Palette.WHITE,
    [Color.TEXT_DARK]: Palette.BLACK,
    [Color.TEXT_LIGHT]: Palette.GRAY,
    [Color.SUBTITLE]: Palette.GRAY_LIGHT,
    [Color.BORDER]: Palette.GRAY_SUPER_LIGHT,
    [Color.PRIMARY_DARK]: Palette.BLUE_DARK,
    [Color.PRIMARY_LIGHT]: Palette.BLUE_LIGHT,
    [Color.ERROR]: Palette.RED,
    [Color.SUCCESS]: Palette.GREEN,
  },
};

export default ColorSchema;
