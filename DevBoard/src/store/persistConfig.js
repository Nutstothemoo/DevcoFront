import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { loginSlice } from '../features/user/user';

const loginPersistConfig = {
  key: 'login',
  storage,
  whitelist: ['user'], // only saving user state on the redux toolkit store
};

const persistedLoginReducer = persistReducer(loginPersistConfig, loginSlice.reducer);

export { persistedLoginReducer };
