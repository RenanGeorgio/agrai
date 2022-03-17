import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import {
  Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import t from './common/localization';
import userAttributes from './attributes/userAttributes';
import EditItemView from './EditItemView';
import EditAttributesView from './attributes/EditAttributesView';
import LinkField from './form/LinkField';

const useStyles = makeStyles(() => ({
  details: {
    flexDirection: 'column',
     boxShadow: '-4px -4px 16px rgba(0, 0, 0, 0.25)',
  },
}));

const UserPage = () => {
  const classes = useStyles();

  const [item, setItem] = useState();

  return (
    <EditItemView endpoint="users" item={item} setItem={setItem}>
      {item
        && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                margin="normal"
                value={item.name || ''}
                onChange={(event) => setItem({ ...item, name: event.target.value })}
                label={t('sharedName')}
                variant="filled"
              />
              <TextField
                margin="normal"
                value={item.email || ''}
                onChange={(event) => setItem({ ...item, email: event.target.value })}
                label={t('userEmail')}
                variant="filled"
              />
              <TextField
                margin="normal"
                type="password"
                onChange={(event) => setItem({ ...item, password: event.target.value })}
                label={t('userPassword')}
                variant="filled"
              />
            </AccordionDetails>
          </Accordion>
        </>
        )}
    </EditItemView>
  );
};

export default UserPage;
