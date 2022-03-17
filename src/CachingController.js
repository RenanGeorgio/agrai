import React, { useContext, useState } from "react";
import { useDispatch, useSelector, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  geofencesActions, clientActions
} from './store';
import { useEffectAsync } from './reactHelper';
import { getUserId, getClient } from './common/selectors';
import AuthContext from "./contexts/auth";
import { SatelliteApi } from "./services";

const CachingController = () => {
  const history = useHistory();
  const authenticated = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const user = useSelector(getUserId);

  const { signed, client } = useContext(AuthContext);

  useEffectAsync(async () => {
    //const response = await AuthApi('/server', { method : 'GET' });
    //if (response.data) {
    //  dispatch(sessionActions.updateServer(await response.data));
    //
    //  if(!signed){
    //    history.push('/sign-in');
    //  }
    //}
    const appid = 'efa9540787cf639421e775f0254a4ce1';
    const response = await SatelliteApi(`/polygons?appid=${appid}`, 
    { 
      method : 'GET', 
      headers: 
      { 
        'Content-Type': 'text/csv'
      }
    });
    console.log("PRIMEIRO TESTE");
    console.log(response);
    if (response.data) {
      dispatch(geofencesActions.update(await response.data));

    }
    history.push('/login');
  }, []);
  /*
  let group_id;

  useEffectAsync(async () => {
    if (signed) {
      const response = await TrackerApi('/api/drivers/groups', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        auth:
        {
          username: client.username,
          password: client.password
        },
        params:
        {
          all : false,
          userId : user
        }
      });
      
      group_id = response.data.groupId;
      if (response.data) {
        dispatch(groupsActions.update(await response.data.data));
      }
    }
  }, [signed]);

  useEffectAsync(async () => {
    if (signed) {
      const response = await TrackerApi('/api/drivers/geofences', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        auth:
        {
          username: client.username,
          password: client.password
        },
        params:
        {
          all : false,
          userId : user,
          deviceId : items.selectedId,
          groupId : group_id,
          refresh : true
        }
      });
 
      if (response.data) {
        dispatch(geofencesActions.update(await response.data.data));
      }
    }
  }, [signed]);

  useEffectAsync(async () => {
    if (signed) {
      const response = await TrackerApi('/api/drivers/drivers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        auth:
        {
          username: client.username,
          password: client.password
        },
        params:
        {
          all : false,
          userId : user,
          deviceId : items.selectedId,
          groupId : group_id,
          refresh : true
        }
      });
  
      if (response.data) {
        dispatch(driversActions.update(await response.data.data));
      }
    }
  }, [signed]);

  useEffectAsync(async () => {
    if (signed) {
      const response = await TrackerApi('/api/drivers/maintenance', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        auth:
        {
          username: client.username,
          password: client.password
        },
        params:
        {
          all : false,
          userId : user,
          deviceId : items.selectedId,
          groupId : group_id,
          refresh : true
        }
      });
 
      if (response.data) {
        dispatch(maintenancesActions.update(await response.data.data));
      }
    }
  }, [signed]);
  */

  return null;
};

export default connect()(CachingController);
