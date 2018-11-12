import { InjectionToken } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, combineReducers, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from '../app.state';
import { storageConfig } from '../store.config';
import { authReducer } from './auth.reducer';
import { expressionReducer } from './expression.reducer';
import { settingsReducer } from './settings.reducer';
import { todoReducer } from './todo.reducer';

/*
 * LocalStorageSyncReducer ::
 *    See documentation for further information:  https://github.com/btroncone/ngrx-store-localstorage
 */
const localStorageSyncReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  return localStorageSync(storageConfig)(reducer);
};

export const metaReducers: Array<MetaReducer<AppState, Action>> = [localStorageSyncReducer];


/*
 * Nested Reducers ::
 *    See link for further information:  https://github.com/ngrx/platform/issues/306
 */
const combinedReducers = () => {
  return {
    state: combineReducers({
      session: authReducer,
      settings: settingsReducer,
      expressions: expressionReducer,
      todos: todoReducer, // TODO remove,
      router: routerReducer
    })
  };
};

export const reducerToken = new InjectionToken<ActionReducerMap<AppState>>('Reducers');

export const reducerProvider = [
  { provide: reducerToken, useFactory: combinedReducers }
];


