import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnDestroy {
  subscriptions: Subscription[];
  isLoading: boolean;
  hint: Hint;

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    window.console.log(`LoadingPageComponent::ngOnDestroy() --> unsubscribe from ${this.subscriptions.length} subscriptions.`);
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  register(sub: Subscription): void {
    window.console.log('LoadingPageComponent::register() --> a SubPage registered a subscription. New Size = ', this.subscriptions.length);
    this.subscriptions.push(sub);
  }

  showHint(hint: Hint): void {
    this.hint = hint;
  }
}
