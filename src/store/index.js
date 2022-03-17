import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { sessionReducer as session } from './session';
import { geofencesReducer as geofences } from './geofences';
import { clientReducer as client } from './client';

const reducer = combineReducers({
  session,
  geofences,
  client
});

export { sessionActions } from './session';
export { geofencesActions } from './geofences';
export { clientActions } from './client';

export default configureStore({ reducer });
