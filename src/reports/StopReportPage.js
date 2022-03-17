import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTheme } from '@material-ui/core/styles';
import {
  formatDistance, formatHours, formatDate, formatVolume,
} from '../common/formatter';
import ReportFilter from './ReportFilter';
import ReportLayout from './ReportLayout';
import { useAttributePreference } from '../common/preferences';
import t from '../common/localization';

import { TrackerApi } from "../services";

const Filter = ({ setItems }) => {
  const handleSubmit = async (deviceId, from, to, mail, headers) => {
    const stops = 
    {
      deviceId: deviceId,
      from: from, 
      to: to,
      mail: mail
    }

    const response = await TrackerApi('/api/drivers/reports/stops', 
    { 
      method: "GET",
      headers: 
      { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      auth: headers.auth,
      params: stops
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

  return <ReportFilter handleSubmit={handleSubmit} />;
};

const StopReportPage = () => {
  const theme = useTheme();

  const distanceUnit = useAttributePreference('distanceUnit');
  const volumeUnit = useAttributePreference('volumeUnit');

  const [items, setItems] = useState([]);

  const columns = [{
    headerName: t('reportStartTime'),
    field: 'startTime',
    type: 'dateTime',
    width: theme.dimensions.columnWidthDate,
    valueFormatter: ({ value }) => formatDate(value),
  }, {
    headerName: t('positionOdometer'),
    field: 'startOdometer',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatDistance(value, distanceUnit),
  }, {
    headerName: t('positionAddress'),
    field: 'address',
    type: 'string',
    hide: true,
    width: theme.dimensions.columnWidthString,
  }, {
    headerName: t('reportEndTime'),
    field: 'endTime',
    type: 'dateTime',
    width: theme.dimensions.columnWidthDate,
    valueFormatter: ({ value }) => formatDate(value),
  }, {
    headerName: t('reportDuration'),
    field: 'duration',
    type: 'string',
    width: theme.dimensions.columnWidthString,
    valueFormatter: ({ value }) => formatHours(value),
  }, {
    headerName: t('reportEngineHours'),
    field: 'engineHours',
    type: 'string',
    width: theme.dimensions.columnWidthString,
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

export default StopReportPage;
