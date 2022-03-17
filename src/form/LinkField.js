import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { useEffectAsync } from '../reactHelper';
import AuthContext from "../contexts/auth";

import { TrackerApi } from "../services";

const LinkField = ({
  margin,
  variant,
  label,
  endpointAll,
  endpointLinked,
  baseId,
  keyBase,
  keyLink,
  keyGetter = (item) => item.id,
  titleGetter = (item) => item.name,
}) => {
  const [items, setItems] = useState();
  const [linked, setLinked] = useState();

  const { signed, client } = useContext(AuthContext);

  useEffectAsync(async () => {
    const response = await TrackerApi(endpointAll,
    {
      auth: 
      {
        username: client.username,
        password: client.password
      }
    });
    
    if (response.data) {
      setItems(await response.data.data);
    }
  }, []);

  useEffectAsync(async () => {
    const response = await TrackerApi(endpointLinked, 
    {
      auth: 
      {
        username: client.username,
        password: client.password
      }
    });
    
    if (response.data) {
      const data = await response.data.data;
      setLinked(data.map((it) => it.id));
    }
  }, []);

  const createBody = (linkId) => {
    const body = {};
    body[keyBase] = baseId;
    body[keyLink] = linkId;
    return body;
  };

  const onChange = async (event) => {
    const oldValue = linked;
    const newValue = event.target.value;
    const results = [];
    newValue.filter((it) => !oldValue.includes(it)).forEach((added) => {
      results.push(TrackerApi('/api/drivers/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        auth: { username: client.username, password: client.password },
        data: JSON.stringify(createBody(added)),
      }));
    });
    oldValue.filter((it) => !newValue.includes(it)).forEach((removed) => {
      results.push(TrackerApi('/api/drivers/permissions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        auth: { username: client.username, password: client.password },
        data: JSON.stringify(createBody(removed)),
      }));
    });
    await Promise.all(results);
    setLinked(newValue);
  };

  if (items && linked) {
    return (
      <FormControl margin={margin} variant={variant}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={linked}
          onChange={onChange}
        >
          {items.map((item) => (
            <MenuItem key={keyGetter(item)} value={keyGetter(item)}>{titleGetter(item)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return null;
};

export default LinkField;
