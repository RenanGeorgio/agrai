import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  formatDistance, formatHours, formatDate, formatSpeed, formatVolume,
} from '../common/formatter';
import ReportFilter from './ReportFilter';
import ReportLayout from './ReportLayout';
import { useAttributePreference } from '../common/preferences';
import t from '../common/localization';

import { TrackerApi } from '../services';

const Filter = ({ setItems }) => {
  const [daily, setDaily] = useState(false);

  const handleSubmit = async (deviceId, from, to, mail, headers) => {
    const summary = 
    {
      deviceId: deviceId,
      from: from, 
      to: to,
      mail: mail
    };

    const response = await TrackerApi('/api/drivers/reports/summary', 
    { 
      method: "GET",
      headers: 
      { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      auth: headers.auth,
      params: summary
    });
    if (response.data) {
      const contentType = response.headers['content-type'].split(";")[0];
      if (contentType) {
        if (contentType === 'application/json') {
          setItems(await response.data.data);
        } else {
          window.location.assign(window.URL.createObjectURL(await response.blob()));
        }
      }
    }
  };

  return (
    <ReportFilter handleSubmit={handleSubmit}>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={<Checkbox checked={daily} onChange={(e) => setDaily(e.target.checked)} />}
          label={t('reportDaily')}
        />
      </Grid>
    </ReportFilter>
  );
};

const SummaryReportPage = () => {
  const theme = useTheme();

  const distanceUnit = useAttributePreference('distanceUnit');
  const speedUnit = useAttributePreference('speedUnit');
  const volumeUnit = useAttributePreference('volumeUnit');

  const [items, setItems] = useState([]);

  const columns = [{
    headerName: t('reportStartDate'),
    field: 'startTime',
    type: 'dateTime',
    width: theme.dimensions.columnWidthDate,
    valueFormatter: ({ value }) => formatDate(value, 'YYYY-MM-DD'),
  }, {
    headerName: t('sharedDistance'),
    field: 'distance',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatDistance(value, distanceUnit),
  }, {
    headerName: t('reportStartOdometer'),
    field: 'startOdometer',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatDistance(value, distanceUnit),
  }, {
    headerName: t('reportEndOdometer'),
    field: 'endOdometer',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatDistance(value, distanceUnit),
  }, {
    headerName: t('reportAverageSpeed'),
    field: 'averageSpeed',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatSpeed(value, speedUnit),
  }, {
    headerName: t('reportMaximumSpeed'),
    field: 'maxSpeed',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatSpeed(value, speedUnit),
  }, {
    headerName: t('reportEngineHours'),
    field: 'engineHours',
    type: 'string',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatHours(value),
  }, {
    headerName: t('reportSpentFuel'),
    field: 'spentFuel',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    hide: true,
    valueFormatter: ({ value }) => formatVolume(value, volumeUnit),
  }];

  return (
    <ReportLayout filter={<Filter setItems={setItems} />}>
      <DataGrid
        rows={items}
        columns={columns}
        hideFooter
        autoHeight
        getRowId={() => Math.random()}
      />
    </ReportLayout>
  );
};

export default SummaryReportPage;
