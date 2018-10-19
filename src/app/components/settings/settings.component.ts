import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Language } from '../../enums/language.enum';
import { Settings } from '../../models/settings.model';
import { SaveSettings } from '../../state/actions/settings.action';
import { AppState } from '../../state/app.state';
import { StoreKey } from '../../state/store.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  languageEnum: Language;
  model: Settings;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(StoreKey).subscribe(state => {
      this.model = Object.assign({}, state.settings);
    });
  }

  get languages(): Array<Object> {
    const objects: Array<Object> = [];
    Object.keys(Language).forEach(key => {
      objects.push({ key: key, value: Language[key] });
    });
    return objects;
  }

  onSubmit() {
    this.store.dispatch(new SaveSettings(this.model));
  }
}
