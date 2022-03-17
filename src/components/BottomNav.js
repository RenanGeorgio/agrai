import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  makeStyles, Paper, Toolbar, IconButton, useMediaQuery, useTheme,
} from '@material-ui/core';

import  WbSunnyIcon from '@material-ui/icons/WbSunny';
import DescriptionIcon from '@material-ui/icons/Description';
import TodayIcon from '@material-ui/icons/Today';
import MapIcon from '@material-ui/icons/Map';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import { sessionActions } from '../store';
import t from '../common/localization';

const useStyles = makeStyles((theme) => ({
  container: {
    bottom: theme.spacing(0),
    left: '0px',
    width: '100%',
    position: 'fixed',
    zIndex: 1301,
    [theme.breakpoints.up('lg')]: {
      left: theme.spacing(0),
      bottom: theme.spacing(1.5),
      width: theme.dimensions.drawerWidthDesktop,
    },
  },
  toolbar: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#50b848',
    boxShadow: '-6px -6px 24px rgba(0, 0, 0, 0.25)',
    maxWidth: theme.dimensions.bottomNavMaxWidth,
    margin: 'auto',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.75rem',
    fontWeight: 'normal',
  },
}));

const BottomNav = ({ showOnDesktop }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const dispatch = useDispatch();

  const NavLink = ({ children, location }) => (
    <IconButton component={Link} classes={{ label: classes.navItem }} to={location}>
      {children}
    </IconButton>
  );

  if (isDesktop && !showOnDesktop) return null;

  return (
    <div className={classes.container}>
      <Paper square elevation={3}>
        <Toolbar className={classes.toolbar} disableGutters>

          {isDesktop ? (
            <NavLink location="/replay">
              <WbSunnyIcon />
              <span>Monitoramento <br /> Climatico</span>
            </NavLink>
          ) : (
            <NavLink location="/">
              <MapIcon />
              {t('mapTitle')}
            </NavLink>
          )}

          <NavLink location="/reports/route">
            <DescriptionIcon />
            {t('reportTitle')}
          </NavLink>

          <NavLink location="/settings/notifications">
            <TodayIcon />
            <span>Agenda do <br /> Campo</span>
          </NavLink>
        </Toolbar>
      </Paper>
    </div>
  );
};

export default BottomNav;
