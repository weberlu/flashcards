import { Settings } from '../../models/settings.model';
import { SettingsAction, SettingsActionTypes } from '../actions/settings.action';
import { INITIAL_STATE } from '../app.state';

export function settingsReducer(state: Settings = INITIAL_STATE.state.settings, action: SettingsAction) {
  switch (action.type) {
    case SettingsActionTypes.SAVE_SETTINGS:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
}
