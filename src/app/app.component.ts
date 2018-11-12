import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppState } from './state/app.state';
import { StoreKey } from './state/store.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular + ngrx: flashcards';

  constructor(private store: Store<AppState>, private translateService: TranslateService) {
    this.store.select(StoreKey).subscribe((state => {
      this.translateService.addLangs(['de', 'en']);
      this.translateService.setDefaultLang('de');
      this.translateService.use(state.settings.language);
    }));

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      window.console.log(`language change detected to: '${event.lang}'`);
      // TODO: page reload?
    });
  }
}
