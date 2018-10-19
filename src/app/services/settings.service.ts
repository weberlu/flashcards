import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Language } from '../enums/language.enum';
import { AppState } from '../state/app.state';
import { Settings } from '../models/settings.model';
import { StoreKey } from '../state/store.config';

@Injectable()
export class SettingsService {
  private settings: Settings;

  constructor(private store: Store<AppState>) {
    this.store.select(StoreKey).subscribe((state => this.settings = state.settings));
  }

  public getLanguage(): Language {
    return this.settings.language;
  }

  public getForeignLanguage(): Language {
    return this.getLanguage() === Language.ENGLISH ? Language.GERMAN : Language.ENGLISH;
  }

  public getInquiryQuantity(): number {
    return this.settings.inquiryQuantity;
  }
}
