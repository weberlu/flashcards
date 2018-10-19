import { Action } from '@ngrx/store';
import { Session } from '../../models/session.model';

export enum AuthActionTypes {
  ADD_TOKEN = 'ADD_TOKEN',
  DELETE_TOKEN = 'DELETE_TOKEN',
  UPDATE_TOKEN = 'UPDATE_TOKEN'
}

export class AddToken implements Action {
  readonly type = AuthActionTypes.ADD_TOKEN;
  constructor(public payload: Session) {}
}

export class UpdateToken implements Action {
  readonly type = AuthActionTypes.UPDATE_TOKEN;
  constructor() {}
}

export class RemoveToken implements Action {
  readonly type = AuthActionTypes.DELETE_TOKEN;
  constructor() {}
}

export type AuthAction = AddToken | UpdateToken | RemoveToken;
