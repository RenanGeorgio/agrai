import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { useEffectAsync } from './reactHelper';
import {
  Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography, Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


import { SatelliteApi } from "../services";
import AuthContext from "../contexts/auth";

const useStyles = makeStyles(() => ({
  details: {
    flexDirection: 'column',
  },
}));

const Data = (props) => {
  const {lat, lng} = props;
  const { signed, client } = useContext(AuthContext);

  const classes = useStyles();
  let items;

  useEffectAsync( () => {
    if(geofences){
      const appid = 'efa9540787cf639421e775f0254a4ce1';
      try {
        geofences.forEach(async (geofence) => {
          const lat = geofence.center[1];
          const lng = geofence.center[0];
          const response = await SatelliteApi(`/weather/forecast?lat=${lat.toString()}&lon=${lng.toString()}&appid=${appid}`, 
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
        });
      }
      catch (err){
        console.log(err);
      }
    }
  }, [geofences]);

  console.log("POR FAVOR 2"); 
  console.log(items);

  return (
    <Box sx={{ minWidth: 275 }}>
      {!items.length > 0 && (
        <Paper>
          {items}
        </Paper>
      )}
    </Box>
  );
};

export default Data;
