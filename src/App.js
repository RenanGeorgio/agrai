import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core'; 

import MainPage from './MainPage';
import RouteReportPage from './reports/RouteReportPage';
import UserPage from './UserPage';
import WeatherList from './WeatherList';
import DiaryPage from './DiaryPage';
import NotificationsPage from './settings/NotificationsPage';
import NotificationPage from './settings/NotificationPage';
import GroupsPage from './settings/GroupsPage';
import GroupPage from './settings/GroupPage';
import EventReportPage from './reports/EventReportPage';
import ReplayPage from './reports/ReplayPage';
import TripReportPage from './reports/TripReportPage';
import StopReportPage from './reports/StopReportPage';
import SummaryReportPage from './reports/SummaryReportPage';
import ChartReportPage from './reports/ChartReportPage';
import DriversPage from './settings/DriversPage';
import DriverPage from './settings/DriverPage';
import ComputedAttributesPage from './settings/ComputedAttributesPage';
import ComputedAttributePage from './settings/ComputedAttributePage';
import MaintenancesPage from './settings/MaintenancesPage';
import MaintenancePage from './settings/MaintenancePage';
import CachingController from './CachingController';

import LoginForm from './components/registration/LoginForm';
import RegisterForm from './components/registration/RegisterForm';
import ResetPasswordForm from './components/registration/ResetPasswordForm';

import theme from './theme';
import GeofencesPage from './GeofencesPage';
import GeofencePage from './GeofencePage';

import { AuthProvider } from './contexts/auth';

import dotenv from 'dotenv';
dotenv.config({path: "../local.env"});

const App = () => {
  const initialized = true;
 
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <CachingController />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/reset-password" component={ResetPasswordForm} />
          <Route>
            {!initialized ? (<LinearProgress />) : (
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/replay" component={ReplayPage} />
                <Route exact path="/user/:id?" component={UserPage} />
                <Route exact path="/geofence/:id?" component={GeofencePage} />
                <Route exact path="/geofences" component={GeofencesPage} />
                <Route exact path="/settings/notifications" component={NotificationsPage} />
                <Route exact path="/settings/notification/:id?" component={NotificationPage} />
                <Route exact path="/settings/groups" component={GroupsPage} />
                <Route exact path="/settings/group/:id?" component={GroupPage} />
                <Route exact path="/settings/drivers" component={DriversPage} />
                <Route exact path="/settings/driver/:id?" component={DriverPage} />
                <Route exact path="/settings/attributes" component={ComputedAttributesPage} />
                <Route exact path="/settings/attribute/:id?" component={ComputedAttributePage} />
                <Route exact path="/settings/maintenances" component={MaintenancesPage} />
                <Route exact path="/settings/maintenance/:id?" component={MaintenancePage} />
                <Route exact path="/reports/route" component={RouteReportPage} />
                <Route exact path="/reports/event" component={EventReportPage} />
                <Route exact path="/reports/trip" component={TripReportPage} />
                <Route exact path="/reports/stop" component={StopReportPage} />
                <Route exact path="/reports/summary" component={SummaryReportPage} />
                <Route exact path="/reports/chart" component={ChartReportPage} />
                <Route exact path="/weather" component={WeatherList} />
                <Route exact path="/diary" component={DiaryPage} />
              </Switch>
            )}
          </Route>
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
