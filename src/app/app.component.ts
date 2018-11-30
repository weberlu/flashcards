import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from './state/app.state';
import { StoreKey } from './state/store.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular + ngrx: flashcards';

  private subscriptions: Subscription[];

  constructor(private store: Store<AppState>, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.store.select(StoreKey).subscribe((state => {
        this.translateService.addLangs(['de', 'en']);
        this.translateService.setDefaultLang('de');
        this.translateService.use(state.settings.language);
      })),

      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        window.console.log(`language change detected to: '${event.lang}'`);
        // TODO: page reload?
      })
    ];
  }

  ngOnDestroy() {
    // TODO: überall sonst ebenfalls einbauen --> evtl. sogar abstrahieren?
    this.subscriptions.forEach(it => it.unsubscribe());
  }
}
