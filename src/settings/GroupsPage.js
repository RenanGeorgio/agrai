import React, { useState, useContext } from 'react';
import {
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody, makeStyles, IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import t from '../common/localization';
import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';
import OptionsLayout from './OptionsLayout';
import AuthContext from "../contexts/auth";

import { TrackerApi } from "../services";

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));

const GroupsView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  const { signed, client } = useContext(AuthContext);

  useEffectAsync(async () => {
    const response = await TrackerApi('/api/drivers/groups',
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

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.columnAction} />
            <TableCell>{t('sharedName')}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const GroupsPage = () => (
  <OptionsLayout>
    <EditCollectionView content={GroupsView} editPath="/settings/group" endpoint="groups" />
  </OptionsLayout>
);

export default GroupsPage;
