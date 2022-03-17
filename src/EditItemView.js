import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import t from './common/localization';
import { useEffectAsync } from './reactHelper';
import OptionsLayout from './settings/OptionsLayout';
import AuthContext from "./contexts/auth";

import { TrackerApi } from "./services";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      flexBasis: '33%',
    },
  },
}));

const EditItemView = ({
  children, endpoint, item, setItem,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const { signed, client } = useContext(AuthContext);

  useEffectAsync(async () => {
    if (id) {
      const response = await TrackerApi(`/api/drivers/${endpoint}`, {
        method: 'GET',
        auth:
        {
          username: client.username,
          password: client.password
        },
        params: 
        {
          id: id
        }
      });

      if (response.data) {
        setItem(await response.data.data);
      }
    } else {
      setItem({});
    }
  }, [id]);

  const handleSave = async () => {
    console.log("handler save do edit");
    let url = `/api/drivers/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }

    const options = {
      method: !id ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      auth: { username: client.username, password: client.password },
      data: JSON.stringify(item),
      url,
    };
    console.log(options);
    const response = await TrackerApi(options);

    if (response.data) {
      history.goBack();
    }
  };

  return (
    <OptionsLayout>
      <Container maxWidth="xs" className={classes.container}>
        {children}
        <FormControl fullWidth margin="normal">
          <div className={classes.buttons}>
            <Button type="button" color="primary" variant="outlined" onClick={() => history.goBack()}>
              {t('sharedCancel')}
            </Button>
            <Button type="button" color="primary" variant="contained" onClick={handleSave}>
              {t('sharedSave')}
            </Button>
          </div>
        </FormControl>
      </Container>
    </OptionsLayout>
  );
};

export default EditItemView;
