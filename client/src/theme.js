import { createMuiTheme } from '@material-ui/core/styles';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5ddef4',
      main: '#00acc1',
      dark: '#007c91',
      contrastText: '#000000',
    },
    secondary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Helvetica Neue"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    // Could inject this value to enable toggling it
    fontSize: 12
  },
});

export default theme;