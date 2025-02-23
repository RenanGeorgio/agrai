import React, { useState, useContext } from 'react';
import {
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody, makeStyles, IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
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

const ComputedAttributeView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const adminEnabled = useSelector((state) => state.session.user && state.session.user.administrator);

  const { signed, client } = useContext(AuthContext);

  useEffectAsync(async () => {
    const response = await TrackerApi('/api/drivers/attributes', {
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
            {adminEnabled && <TableCell className={classes.columnAction} />}
            <TableCell>{t('sharedDescription')}</TableCell>
            <TableCell>{t('sharedAttribute')}</TableCell>
            <TableCell>{t('sharedExpression')}</TableCell>
            <TableCell>{t('sharedType')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {adminEnabled
              && (
              <TableCell className={classes.columnAction} padding="none">
                <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
              )}
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.attribute}</TableCell>
              <TableCell>{item.expression}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ComputedAttributesPage = () => (
  <OptionsLayout>
    <EditCollectionView content={ComputedAttributeView} editPath="/settings/attribute" endpoint="attributes/computed" />
  </OptionsLayout>
);

export default ComputedAttributesPage;
