const supplyfyWhite = '#EFE6E2';
const supplyfyBlack = '#000000';
const supplyfyStrongGreen = '#50b848';
const supplyfyGreen = '#5ddb53';
const supplyfyWeakGreen = '#83d67c';
const supplyfyRed = '#db5a35';
const supplyfyGray = '#32494D';

function init() {}

function log(error) {
  console.error(error);
}

const palette = {
  common: {
    green: supplyfyGreen,
    black: supplyfyBlack,
    red: supplyfyRed,
    gray: supplyfyGray,
    main: supplyfyWeakGreen,
  },
  primary: {
    main: supplyfyStrongGreen,
  },
  secondary: {
    main: supplyfyGray,
    contrastText: supplyfyWhite,
  },
  colors: {
    red: {
      color: supplyfyRed,
    },
    green_strong: {
      color: supplyfyStrongGreen,
    },
    green_weak: {
      color: supplyfyWeakGreen,
    },
    gray: {
      color: supplyfyGray,
    },
    black: {
      color: supplyfyBlack,
    },
    white: {
      color: supplyfyWhite,
    },
  },
};

export default palette;