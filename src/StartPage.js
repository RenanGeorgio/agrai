import React from 'react';
import { useMediaQuery, makeStyles, Paper, Box, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: theme.dimensions.paddingForm,
    boxShadow: '-2px 0px 24px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(25, 25, 25, 25),
    },
  },
  logo_ui: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    color: theme.palette.secondary.main,
    background: theme.palette.common.main,
    padding: theme.spacing(5),
    width: '20%',
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(5),
    width: '200%',
  },
}));

const StartPage = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <main className={classes.root}>
      <Box color="yellow" className={classes.logo_ui}>
      </Box>
      <Paper className={classes.paper}>
        <form className={classes.form}>
          { children }
        </form>
      </Paper>
      <Box color="yellow" className={classes.logo_ui}>
      </Box>
    </main>
  );
};

export default StartPage;
