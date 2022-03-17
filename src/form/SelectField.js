import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { useEffectAsync } from '../reactHelper';
import AuthContext from "../contexts/auth";

import { TrackerApi } from "../services";

const SelectField = ({
  margin,
  variant,
  label,
  multiple,
  value,
  emptyValue = 0,
  onChange,
  endpoint,
  data,
  keyGetter = (item) => item.id,
  titleGetter = (item) => item.name,
}) => {
  const [items, setItems] = useState(data);

  const { signed, client } = useContext(AuthContext);

  useEffectAsync(async () => {
    if (endpoint) {
      const response = await TrackerApi(endpoint, 
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
    }
  }, []);

  if (items) {
    return (
      <FormControl margin={margin} variant={variant}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple={multiple}
          value={value}
          onChange={onChange}
        >
          {!multiple && emptyValue !== null
            && <MenuItem value={emptyValue}>&nbsp;</MenuItem>}
          {items.map((item) => (
            <MenuItem key={keyGetter(item)} value={keyGetter(item)}>{titleGetter(item)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return null;
};

export default SelectField;
