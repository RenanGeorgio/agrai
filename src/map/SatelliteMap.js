import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';

import { SatelliteApi } from "../services";

const SatelliteMap = () => {
    const [data, setData] = useState('');

  useEffect( async () => {
    const appid = 'efa9540787cf639421e775f0254a4ce1';
    const polygon = '6214019c390ec41bdb4d9cd4';
    const end = Math.floor((new Date()).getTime() / 1000);
    const start = parseInt(Math.floor((new Date()).getTime() / 1000) - (end * 0.1))
    const response = await SatelliteApi(`/image/search?start=${start.toString()}&end=${end.toString()}&polyid=${polygon}&appid=${appid}`, 
    { 
      method : 'GET', 
      headers: 
      { 
        'Content-Type': 'text/csv'
      }
    });
    console.log("SEGUNDO TESTE");
    const value = response.data[0].image.truecolor;
    console.log(value);
    setData(value);
  }, []);

  return (
    <Grid style={{ flex: 1 }}>
      <img src={data} />
    </Grid>
  );
  
};


export default SatelliteMap;