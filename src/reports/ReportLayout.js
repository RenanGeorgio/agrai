import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Grid, Typography, Divider, Drawer, makeStyles, IconButton, Hidden,
} from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SideNav from '../components/SideNav';
import NavBar from '../components/NavBar';
import t from '../common/localization';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  drawerContainer: {
    width: theme.dimensions.drawerWidthDesktop,
  },
  drawer: {
    width: theme.dimensions.drawerWidthDesktop,
    backgroundColor: '#50b848', 
    color: 'black',
    [theme.breakpoints.down('md')]: {
      width: theme.dimensions.drawerWidthTablet,
    },
  },
  content: {
    flex: 1,
    padding: theme.spacing(5, 3, 3, 3),
    backgroundColor: '#83d67c',
    boxShadow: '-4px -4px 16px rgba(0, 0, 0, 0.25)',
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  backArrowIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  toolbar: {
    [theme.breakpoints.down('md')]: {
      ...theme.mixins.toolbar,
    },
  },
}));

const routes = [
  { name: 'Relatorio 1', href: '/reports/route', icon: <TimelineIcon /> },
  { name: 'Relatorio 2', href: '/reports/event', icon: <NotificationsActiveIcon /> },
  { name: 'Relatorio 3', href: '/reports/trip', icon: <PlayCircleFilledIcon /> },
  { name: 'Relatorio 4', href: '/reports/stop', icon: <PauseCircleFilledIcon /> },
  { name: 'Relatorio 5', href: '/reports/summary', icon: <FormatListBulletedIcon /> },
  { name: 'Relatorio 6', href: '/reports/chart', icon: <TrendingUpIcon /> },
];

const ReportLayout = ({ children, filter }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [reportTitle, setReportTitle] = useState();

  useEffect(() => {
    routes.forEach((route) => {
      switch (location.pathname) {
        case `${route.href}`:
          setReportTitle(route.name);
          break;
        default:
          break;
      }
    });
  }, [location]);

  const pageTitle = `${t('reportTitle')} / ${reportTitle}`;

  return (
    <div className={classes.root}>
      <Hidden only={['lg', 'xl']}>
        <NavBar setOpenDrawer={setOpenDrawer} title={pageTitle} />
        <Drawer
          variant="temporary"
          open={openDrawer}
          onClose={() => setOpenDrawer(!openDrawer)}
          classes={{ paper: classes.drawer }}
        >
          <SideNav routes={routes} />
        </Drawer>
      </Hidden>
      <Hidden only={['xs', 'sm', 'md']}>
        <Drawer
          variant="permanent"
          classes={{ root: classes.drawerContainer, paper: classes.drawer }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={() => history.push('/')}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {t('reportTitle')}
            </Typography>
          </div>
          <Divider />
          <SideNav routes={routes} />
        </Drawer>
      </Hidden>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction="column" spacing={2}>
          <Grid item>{filter}</Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ReportLayout;
