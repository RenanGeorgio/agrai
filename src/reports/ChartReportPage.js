import React, { useState } from 'react';
import {
  Grid, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import ReportLayout from './ReportLayout';
import ReportFilter from './ReportFilter';
import Graph from './Graph';
import { useAttributePreference } from '../common/preferences';
import { formatDate } from '../common/formatter';
import { speedFromKnots } from '../common/converter';
import t from '../common/localization';

import { TrackerApi } from "../services";

const Filter = ({ children, setItems }) => {
  const speedUnit = useAttributePreference('speedUnit');

  const handleSubmit = async (deviceId, from, to, mail, headers) => {
    const chart = 
    {
      deviceId: deviceId,
      from: from, 
      to: to,
      mail: mail
    }

    const response = await TrackerApi('/api/drivers/reports/route', 
    { 
      method: "GET",
      headers: 
      { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      auth: headers.auth,
      params: chart
    });
    if (response.data) {
      const positions = await response.data.data;
      const formattedPositions = positions.map((position) => ({
        speed: Number(speedFromKnots(position.speed, speedUnit)),
        altitude: position.altitude,
        accuracy: position.accuracy,
        fixTime: formatDate(position.fixTime),
      }));
      setItems(formattedPositions);
    }
  };
  return (
    <>
      <ReportFilter handleSubmit={handleSubmit} showOnly />
      {children}
    </>
  );
};

const ChartType = ({ type, setType }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <FormControl variant="filled" margin="normal" fullWidth>
        <InputLabel>{t('reportChartType')}</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="speed">{t('positionSpeed')}</MenuItem>
          <MenuItem value="accuracy">{t('positionAccuracy')}</MenuItem>
          <MenuItem value="altitude">{t('positionAltitude')}</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

const ChartReportPage = () => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState('speed');

  return (
    <ReportLayout filter={(
      <Filter setItems={setItems}>
        <ChartType type={type} setType={setType} />
      </Filter>
    )}
    >
      <Graph items={items} type={type} />
    </ReportLayout>
  );
};

export default ChartReportPage;
