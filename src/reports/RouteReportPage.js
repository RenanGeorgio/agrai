import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useTheme } from '@material-ui/core/styles';
import {
  formatDistance, formatSpeed, formatBoolean, formatDate, formatCoordinate,
} from '../common/formatter';
import ReportFilter from './ReportFilter';
import ReportLayout from './ReportLayout';
import { useAttributePreference, usePreference } from '../common/preferences';
import t from '../common/localization';

import { TrackerApi } from "../services";

const Filter = ({ setItems }) => {
  const handleSubmit = async (deviceId, from, to, mail, headers) => {
    const route = 
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
      params: route
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

const RouteReportPage = () => {
  const distanceUnit = useAttributePreference('distanceUnit');
  const speedUnit = useAttributePreference('speedUnit');
  const coordinateFormat = usePreference('coordinateFormat');
  const theme = useTheme();

  const columns = [{
    headerName: t('positionFixTime'),
    field: 'fixTime',
    type: 'dateTime',
    width: theme.dimensions.columnWidthDate,
    valueFormatter: ({ value }) => formatDate(value),
  }, {
    headerName: t('positionLatitude'),
    field: 'latitude',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatCoordinate('latitude', value, coordinateFormat),
  }, {
    headerName: t('positionLongitude'),
    field: 'longitude',
    type: 'number',
    width: theme.dimensions.columnWidthNumber,
    valueFormatter: ({ value }) => formatCoordinate('longitude', value, coordinateFormat),
  }, {
    headerName: t('positionSpeed'),
    field: 'speed',
    type: 'number',
    width: theme.dimensions.columnWidthString,
    valueFormatter: ({ value }) => formatSpeed(value, speedUnit),
  }, {
    headerName: t('positionAddress'),
    field: 'address',
    type: 'string',
    width: theme.dimensions.columnWidthString,
  }, {
    headerName: t('positionIgnition'),
    field: 'ignition',
    type: 'boolean',
    width: theme.dimensions.columnWidthBoolean,
    valueGetter: ({ row }) => row.attributes.ignition,
    valueFormatter: ({ value }) => formatBoolean(value),
  }, {
    headerName: t('deviceTotalDistance'),
    field: 'totalDistance',
    type: 'number',
    hide: true,
    width: theme.dimensions.columnWidthNumber,
    valueGetter: ({ row }) => row.attributes.totalDistance,
    valueFormatter: ({ value }) => formatDistance(value, distanceUnit),
  }];

  const [items, setItems] = useState([]);

  return (
    <ReportLayout filter={<Filter setItems={setItems} />}>
      <Paper>
        <DataGrid
          rows={items}
          columns={columns}
          hideFooter
          autoHeight
        />
      </Paper>
    </ReportLayout>
  );
};

export default RouteReportPage;
