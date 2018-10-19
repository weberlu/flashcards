import { Session } from '../../models/session.model';
import { INITIAL_STATE } from '../app.state';
import { AuthAction, AuthActionTypes } from '../actions/auth.action';

export function authReducer(state: Session = INITIAL_STATE.state.session, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.ADD_TOKEN:
      return Object.assign({}, state, action.payload);

    case AuthActionTypes.UPDATE_TOKEN:
      return Object.assign({}, state, {
        expires: new Date()
      });

    case AuthActionTypes.DELETE_TOKEN:
      return Object.assign({}, state, {
        session: null
      });

    default:
      return state;
  }
}
