import React, { useState, useContext } from 'react';
import {
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody, makeStyles, IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import t from '../common/localization';
import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';

import positionAttributes from '../attributes/positionAttributes';
import { formatDistance, formatSpeed } from '../common/formatter';
import { useAttributePreference } from '../common/preferences';
import OptionsLayout from './OptionsLayout';
import AuthContext from "../contexts/auth";

import { TrackerApi } from "../services";

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));

const MaintenancesView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const speedUnit = useAttributePreference('speedUnit');
  const distanceUnit = useAttributePreference('distanceUnit');

  const { signed, client } = useContext(AuthContext);

  useEffectAsync(async () => {
    const response = await TrackerApi('/api/drivers/maintenance', 
    {
      method: 'GET',
      auth:
      {
        username: client.username,
        password: client.password
      }
    });
    
    if (response.data) {
      setItems(await response.data.data);
    }
  }, [updateTimestamp]);

  const convertAttribute = (key, value) => {
    const attribute = positionAttributes[key];
    if (attribute && attribute.dataType) {
      switch (attribute.dataType) {
        case 'speed':
          return formatSpeed(value, speedUnit);
        case 'distance':
          return formatDistance(value, distanceUnit);
        default:
          return value;
      }
    }

    return value;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.columnAction} />
            <TableCell>{t('sharedName')}</TableCell>
            <TableCell>{t('sharedType')}</TableCell>
            <TableCell>{t('maintenanceStart')}</TableCell>
            <TableCell>{t('maintenancePeriod')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className={classes.columnAction} padding="none">
                <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{convertAttribute(item.type, item.start)}</TableCell>
              <TableCell>{convertAttribute(item.type, item.period)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MaintenacesPage = () => (
  <OptionsLayout>
    <EditCollectionView content={MaintenancesView} editPath="/settings/maintenance" endpoint="maintenance" />
  </OptionsLayout>
);

export default MaintenacesPage;
