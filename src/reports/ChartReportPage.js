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


const ChartType = ({ type, setType }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <FormControl variant="filled" margin="normal" fullWidth>
        <InputLabel>{t('reportChartType')}</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="speed">Tempo</MenuItem>
          <MenuItem value="accuracy">Local</MenuItem>
          <MenuItem value="altitude">Cultura</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

const ChartReportPage = () => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState('Serie Temporal');

  return (
    <ReportLayout filter={(
      <ChartType type={type} setType={setType} />
    )}
    >
      <Graph items={items} type={type} />
    </ReportLayout>
  );
};

export default ChartReportPage;
