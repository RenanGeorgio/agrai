import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import theme from '@mapbox/mapbox-gl-draw/src/lib/theme';
import { useEffect, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { map } from './Map';
import { geofenceToFeature, geometryToArea } from './mapUtil';
import { geofencesActions } from '../store';
import AuthContext from "../contexts/auth";

import { TrackerApi } from "../services";

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true,
  },
  userProperties: true,
  styles: [...theme, {
    id: 'gl-draw-title',
    type: 'symbol',
    filter: ['all'],
    layout: {
      'text-field': '{user_name}',
      'text-font': ['Roboto Regular'],
      'text-size': 12,
    },
    paint: {
      'text-halo-color': 'white',
      'text-halo-width': 1,
    },
  }],
});

const GeofenceEditMap = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const geofences = useSelector((state) => Object.values(state.geofences.items));

  const { signed, client } = useContext(AuthContext);

  const refreshGeofences = async () => {
    const response = await TrackerApi('/api/drivers/geofences', 
    {
      method: 'GET',
      auth:
        {
          username: client.username,
          password: client.password
        }
    });
    
    if (response.data) {
      dispatch(geofencesActions.refresh(await response.data.data));
    }
  };

  useEffect(() => {
    refreshGeofences();

    map.addControl(draw, 'top-left');

    map.on('draw.create', async (event) => {
      const feature = event.features[0];
      const newItem = { name: '', area: geometryToArea(feature.geometry) };
      draw.delete(feature.id);
      const response = await TrackerApi('/api/drivers/geofences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        auth: { username: client.username, password: client.password },
        data: JSON.stringify(newItem),
      });
      if (response.data) {
        const item = await response.json();
        history.push(`/geofence/${item.id}`);
      }
    });

    map.on('draw.delete', async (event) => {
      const feature = event.features[0];
      const response = await TrackerApi(`/api/drivers/geofences/${feature.id}`, {
        method: 'DELETE',
        auth: { username: client.username, password: client.password }
      });
      if (response.data) {
        refreshGeofences();
      }
    });

    map.on('draw.update', async (event) => {
      const feature = event.features[0];
      const item = geofences.find((i) => i.id === feature.id);
      if (item) {
        const updatedItem = { ...item, area: geometryToArea(feature.geometry) };
        const response = await TrackerApi(`/api/drivers/geofences/${feature.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          auth: { username: client.username, password: client.password },
          data: JSON.stringify(updatedItem),
        });
        if (response.data) {
          refreshGeofences();
        }
      }
    });

    return () => map.removeControl(draw);
  }, []);

  useEffect(() => {
    draw.deleteAll();
    geofences.forEach((geofence) => {
      draw.add(geofenceToFeature(geofence));
    });
  }, [geofences]);

  return null;
};

export default GeofenceEditMap;
