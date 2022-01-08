import { combineReducers } from 'redux';

import posts from './notes';
import auth from './auth';

export const reducers = combineReducers({ posts, auth });
