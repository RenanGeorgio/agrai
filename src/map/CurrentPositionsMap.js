import React, { } from 'react';
import { useSelector } from 'react-redux';

import PositionsMap from './PositionsMap';

const CurrentPositionsMap = () => { 
  
  const positions = useSelector((state) => Object.values(state.geofences));
  const position = Object.values(positions[0]);
  return (<PositionsMap positions={position[1].center} />);
};

export default CurrentPositionsMap;
