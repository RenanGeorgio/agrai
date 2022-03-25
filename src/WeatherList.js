import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useEffectAsync } from './reactHelper';

import AuthContext from "./components/Weather";

const WeatherList = () => {
  const { signed, client } = useContext(AuthContext);

  return (
    <Box sx={{ minWidth: 275 }}>
      
    </Box>
  );
};

export default WeatherList;
