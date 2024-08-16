import { configureStore } from '@reduxjs/toolkit'
import translationReducer from './slices/translationSlice'
import contextReducer from './slices/appContextSlice';
import authReducer from './slices/authSlice'
import settingsReducer from './slices/settingsSlice'

import lang from '@/locales/translation/en_us';
import storePersist, { localStorageHealthCheck } from './storePersist';

localStorageHealthCheck();

const LANG_INITIAL_STATE = {
  result: lang,
  langCode: 'en_us',
  isLoading: false,
  isSuccess: false,
};

const lang_state = storePersist.get('translate')
  ? storePersist.get('translate')
  : LANG_INITIAL_STATE;

const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

const auth_state = storePersist.get('auth') ? storePersist.get('auth') : AUTH_INITIAL_STATE;

const initialState = { translation: lang_state, auth: auth_state };

export const store = configureStore({
  reducer: {
    translation: translationReducer,
    context: contextReducer,
    auth: authReducer,
    settings: settingsReducer,
    
  },
  preloadedState: initialState
})