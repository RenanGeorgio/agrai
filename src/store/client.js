import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'client',
  initialState: {
    client: 
    {
      username: "",
      password: "",
      cookie: ""
    }
  },
  reducers: {
    updateClient(state, action) {
      state.client = action.payload;
    }
  }
});

export { actions as clientActions };
export { reducer as clientReducer };
