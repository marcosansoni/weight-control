import { createMuiTheme } from '@material-ui/core';
import ColorSchema, { Color } from './ColorSchema';

const muiTheme = (themeMode) => {
  const theme = ColorSchema[themeMode];

  return createMuiTheme({
    palette: {
      // primary1Color: '#188C9E',
      // primary2Color: '#1fbfbc',
      // accent1Color: '#62625E',
      // accent2Color: '#c0d890',
      primary: {
        main: theme[Color.PRIMARY_DARK],
        light: theme[Color.PRIMARY_LIGHT],
        dark: theme[Color.PRIMARY_DARK],
        // contrastText: theme[Color.PRIMARY_DARK],
      },
      // secondary: {
      // background: theme[Color.TEXT_DARK],
      // main: theme[Color.BACKGROUND],
      // light: theme[Color.TEXT_LIGHT],
      // dark: theme[Color.TEXT_DARK],
      // contrastText: theme[Color.SUBTITLE],
      // },
    },
    typography: {
      fontFamily: 'Poppins, Arial',
      input: {
        fontFamily: 'Poppins, Arial',
      },
      // button: {
      //   textTransform: 'none',
      // },
    },
    // overrides: {
    //   MuiButton: {
    //     // Name of the styleSheet
    //     containedSizeLarge: {
    //       padding: '12px 65px',
    //       fontFamily: 'Campton-book',
    //     },
    //     root: {
    //       fontFamily: 'Campton-book',
    //     },
    //
    //   },
    // },
    // MuiList: {
    //   root: {
    //     overflow: 'auto',
    //   },
    // },
  });
};

export default muiTheme;
