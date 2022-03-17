import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles, Paper, Toolbar, TextField, IconButton, Button, AppBar, Typography
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListIcon from '@material-ui/icons/ViewList';
import Fab from '@material-ui/core/Fab';

import GeofencesList from './GeofencesList';
import Map from './map/Map';
import SatelliteMap from './map/SatelliteMap';
import SelectedDeviceMap from './map/SelectedDeviceMap';
import AccuracyMap from './map/AccuracyMap';
import GeofenceMap from './map/GeofenceMap';
import CurrentPositionsMap from './map/CurrentPositionsMap';
import CurrentLocationMap from './map/CurrentLocationMap';
import BottomNav from './components/BottomNav';
import t from './common/localization';
import { sessionActions } from './store';
import AuthContext from "./contexts/auth";
import AddFarmNotes from './components/addFarmNotes';
import { useDispatch, useSelector } from 'react-redux';

import { TrackerApi } from "./services";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  header: {
    marginRight: theme.spacing(2),
    height: '2vh',
    maxHeight: '2.5%',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 65,
    width: theme.dimensions.drawerWidthDesktop,
    bottom: theme.spacing(8),
    zIndex: 1301,
    transition: 'transform .5s ease',
    backgroundColor: '#white',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: 0,
    },
  },
  sidebarCollapsed: {
    transform: `translateX(-${theme.dimensions.drawerWidthDesktop})`,
    marginLeft: 0,
    [theme.breakpoints.down('md')]: {
      transform: 'translateX(-100vw)',
    },
  },
  paper: {
    zIndex: 1,
  },
  toolbar: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    '& > *': {
      margin: theme.spacing(0, 1),
    },
  },
  deviceList: {
    flex: 1,
  },
  sidebarToggle: {
    position: 'absolute',
    left: theme.spacing(1.5),
    top: theme.spacing(3),
    borderRadius: '0px',
    minWidth: 0,
    [theme.breakpoints.down('md')]: {
      left: 0,
    },
  },
  title: {
    flexGrow: 1,
  },
  sidebarToggleText: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  sidebarToggleBg: {
    backgroundColor: 'white',
    color: '#777777',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  fab: {
    bottom: theme.spacing(0),
    right: '0px',
    position: 'fixed',
    borderRadius: '50%',
    backgroundColor: 'secondary',
    [theme.breakpoints.up('lg')]: {
      right: theme.spacing(1.5),
      bottom: theme.spacing(2.5),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
  },
  fabIcon: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.75rem',
    fontWeight: 'normal',
    borderRadius: '50%'
  },
}));

const MainPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isPhone = useMediaQuery(theme.breakpoints.down('xs'));

  const [deviceName, setDeviceName] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const { signed, client } = useContext(AuthContext);

  const handleLogout = async () => {
    const response = await TrackerApi('/api/drivers/session', { 
      method: 'DELETE',
      auth:
      {
        username: client.username,
        password: client.password
      }
    });
    
    if (response.data) {
      dispatch(sessionActions.updateUser(null));
      history.push('/login');
    }
  };

  const handleClose = () => {
    setCollapsed(!collapsed);
  };

  // fechando sidebar para tablet e celular
  useEffect(() => {
    setCollapsed(isTablet);
  }, [isTablet]);

  return (
    <div className={classes.root}> 
    <AppBar position="static">
      <Toolbar>
        <IconButton 
          edge="start" 
          variant="contained" 
          className={classes.header} 
          color="inherit" 
          aria-label="menu"
          onClick={handleClose}
          >
            <ListIcon />
            <div className={classes.sidebarToggleText}>Geocerca</div>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
         
        </Typography>
        <Button color="inherit" onClick={handleLogout}>{t('loginLogout')}</Button>
      </Toolbar>
    </AppBar>
      <Map>
        <GeofenceMap />
        <AccuracyMap />
        <CurrentPositionsMap />
        <SelectedDeviceMap />
      </Map>
      <Paper elevation={3} className={`${classes.sidebar} ${collapsed && classes.sidebarCollapsed}`}>
        <Paper className={classes.paper} square elevation={3}>
          <Toolbar className={classes.toolbar} disableGutters>
            {isTablet && (
            <IconButton onClick={handleClose}>
              <ArrowBackIcon />
            </IconButton>
            )}
            <TextField
              fullWidth
              name="deviceName"
              value={deviceName}
              autoComplete="deviceName"
              autoFocus
              onChange={(event) => setDeviceName(event.target.value)}
              placeholder="Encontrar geocerca"
              variant="filled"
            />
            <IconButton onClick={() => history.push('/device')}>
              <AddIcon />
            </IconButton>
            {!isTablet && (
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            )}
          </Toolbar>
        </Paper>
        <div className={classes.deviceList}>
          <GeofencesList />
        </div>
      </Paper>
      <Paper elevation={3} className={classes.fab}>
        <Paper className={classes.fabIcon} elevation={3}>
          <AddFarmNotes />
        </Paper>
      </Paper>
      
      <BottomNav showOnDesktop />
    </div>
  );
};

export default MainPage;
