import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import EditCollectionView from './EditCollectionView';

import { SatelliteApi } from "./services";

const useStyles = makeStyles(() => ({
  list: {
    maxHeight: '100%',
    overflow: 'auto',
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
  },
}));

const GeofenceView = ({ onMenuClick }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state) => Object.values(state.geofences.items));

  const handleClick = async (item) =>{
    const end = Math.floor((new Date()).getTime() / 1000);
    const start = parseInt(Math.floor((new Date()).getTime() / 1000) - (end * 0.1))
    const appid = 'efa9540787cf639421e775f0254a4ce1';
    const polygon = '6214019c390ec41bdb4d9cd4';
    const response = await SatelliteApi(`/soil?polyid=${polygon}&appid=${appid}`, 
    { 
      method : 'GET'
    });
    console.log(response);
    /*
    try {
      const lat = item.center[1];
      const lng = item.center[0];
      const response = await SatelliteApi(`/weather/history/accumulated_temperature?lat=${lat.toString()}&lon=${lng.toString()}&threshold=284&start=${start.toString()}&end=${end.toString()}&appid=${appid}`, 
      { 
        method : 'GET'
      });
      console.log("POR FAVOR");
      console.log(response.data);
      if(response.data){
        const aux = response.data;
        items = aux;
        console.log("POR FAVOR 1");
        console.log(items);
      }
    }
    catch (err){
      console.log(err);
    }
    */
  }

  return (
    <List className={classes.list}>
      {items.map((item, index, list) => (
        <Fragment key={item.id}>
          <ListItem button key={item.id} onClick={() => handleClick(item)}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < list.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </List>
  );
};

const GeofencesList = () => (
  <EditCollectionView content={GeofenceView} editPath="/geofence" endpoint="geofences" disableAdd />
);

export default GeofencesList;
