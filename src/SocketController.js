import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import cookie from 'cookie';
import { useHistory } from 'react-router-dom';
import { sessionActions } from './store';
import { useEffectAsync } from './reactHelper';
import AuthContext from "./contexts/auth";
import { getUserId } from './common/selectors';

import { TrackerApi, AuthApi } from "./services";

const dotenv = require("dotenv");
dotenv.config({path: "../local.env"}) 
/*
const displayNotifications = (events) => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      events.forEach((event) => {
        const notification = new Notification(`Event: ${event.type}`);
        setTimeout(notification.close.bind(notification), 4 * 1000);
      });
    } else if (Notification.permission !== 'denied') {
      console.log(Notification.permission);
      Notification.requestPermission((permission) => {
        console.log(Notification.permission);
        if (permission === 'granted') {
          displayNotifications(events);
        }
      });
    }
  }
};
*/
const SocketController = () => {
  /*
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector((state) => !!state.session.user);
  const socketRef = useRef();
  const user = useSelector(getUserId);

  const { signed, client } = useContext(AuthContext);

  const connectSocket = async () => {
    try {
      document.cookie = client.cookie;
      const cookieValue = client.cookie;
      const token = client.token;
     
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const response = await AuthApi(`/api/session?token=${token}`);
      
      if(response){
      const socket = new WebSocket(`${protocol}//${process.env.TRACKING_SERVER}/api/socket`,
        [],
        {
          'headers': { 'Cookie': cookieValue }
        }
      );
      socketRef.current = socket;

      socket.onopen = (event) => {
        console.log("SOCKET CONNECT");
      };

      socket.onclose = () => {
        setTimeout(() => connectSocket(), 60 * 1000);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.devices) {
          dispatch(devicesActions.update(data.devices));
        }
        if (data.positions) {
          dispatch(positionsActions.update(data.positions));
        }
        if (data.events) {
          displayNotifications(data.events);
        }
      };
    }
    }
    catch (err){
      console.log(err);
    }
  };

  useEffectAsync(async () => {
    const response = await AuthApi('api/server', { method : 'GET' });
    if (response.data) {
      dispatch(sessionActions.updateServer(await response.data));
    }
  }, []);

  useEffectAsync(async () => {
    if (signed) {
      const response = await TrackerApi('/api/drivers/devices', {
        method: 'GET',
        auth: 
        {
          username: client.username,
          password: client.password
        },
        params: 
        {
          all : false,
          userId : user,
          id : user,
          uniqueId : user
        }
      });
      
      if (response.data) {
        dispatch(devicesActions.refresh(await response.data.data));
      }
      connectSocket();
    }else{
       history.push('/login');
    }
  }, [signed]);
  */
  return null;
};

export default connect()(SocketController);
