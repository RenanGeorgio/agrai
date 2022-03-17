import React, { useState, useContext } from 'react';
import {
  Grid, useMediaQuery, makeStyles, InputLabel, Select, MenuItem, FormControl, Button, TextField, Link, Image
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sessionActions, clientActions } from '../../store';
import t from '../../common/localization';
import StartPage from '../../StartPage';
import AuthContext from "../../contexts/auth";

import { TrackerApi, AuthApi } from "../../services";

import Logo from "../../assets/Agrai_Logo_Principal.png";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    textAlign: 'center',
  },
  resetPassword: {
    cursor: 'pointer',
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const [failed, setFailed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registrationEnabled = useSelector((state) => (state.session.server ? state.session.server.registration : false));
  const emailEnabled = useSelector((state) => (state.session.server ? state.session.server.emailEnabled : false));

  const { signed, signIn } = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    history.push('/');
  };

  const handleSpecialKey = (e) => {
    if (e.keyCode === 13 && email && password) {
      handleLogin(e);
    }
  };

  return (
    <StartPage>
      <Grid container direction="column" spacing={2}>
        {useMediaQuery(theme.breakpoints.down('md'))
          && (
          <Grid item className={classes.logoContainer}>
          </Grid>
        )}
        <Grid item>
          <Grid item className={classes.logoContainer}>
            <img src={Logo} width="300" height="138" />
          </Grid>
          <TextField
            required
            fullWidth
            error={failed}
            label={t('userEmail')}
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            onKeyUp={handleSpecialKey}
            helperText={failed && 'Invalid username or password'}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            required
            fullWidth
            error={failed}
            label={t('userPassword')}
            name="password"
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
            onKeyUp={handleSpecialKey}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleLogin}
            onKeyUp={handleSpecialKey}
            variant="contained"
            color="secondary"
            disabled={!email || !password}
            fullWidth
          >
            {t('loginLogin')}
          </Button>
        </Grid>
        {/*
        <Grid item container>
          <Grid item>
            <Button onClick={() => history.push('/register')} disabled={!registrationEnabled} color="secondary">
              {t('loginRegister')}
            </Button>
          </Grid>
          <Grid item xs>
            <FormControl variant="filled" fullWidth>
              <InputLabel>{t('loginLanguage')}</InputLabel>
              <Select>
                <MenuItem value="pt-br">Portugues (br) </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        */}
        {/*
        {emailEnabled && (
        <Grid item container justify="flex-end">
          <Grid item>
            <Link onClick={() => history.push('/reset-password')} className={classes.resetPassword} underline="none">{t('loginReset')}</Link>
          </Grid>
        </Grid>
        )}
        */}
      </Grid>
    </StartPage>
  );
};

export default LoginForm;
