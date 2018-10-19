import { Action } from '@ngrx/store';
import { Settings } from '../../models/settings.model';

export enum SettingsActionTypes {
  SAVE_SETTINGS = 'SAVE_SETTINGS'
}

export class SaveSettings implements Action {
  readonly type = SettingsActionTypes.SAVE_SETTINGS;
  constructor(public payload: Settings) {}
}

export type SettingsAction = SaveSettings;
