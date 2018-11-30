import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Language } from '../enums/language.enum';
import { RestEndpoints } from '../enums/rest.endpoints.enum';
import { AddExpressions, RemoveExpression, UpdateExpression } from '../state/actions/expression.action';
import { AppState } from '../state/app.state';
import { StoreKey } from '../state/store.config';
import { RestHttpService } from './rest.http.service';
import { SettingsService } from './settings.service';

@Injectable()
export class InquiryService {
  private expressions: Expression[];

  constructor(private store: Store<AppState>, private http: RestHttpService, private settingsService: SettingsService) {
    this.store.select(StoreKey).subscribe(state => this.expressions = state.expressions);
  }

  public next(): Expression {
    const list = this.getUnansweredExpressions();
    if (list.length > 0) {
      return list[0];
    }
    return undefined;
  }

  public loadExpressions(): Observable<any> {
    window.console.log('InquiryService::loadExpressions was called.');
    const observable = this.http.doGet(RestEndpoints.EXPRESSIONS, { quantity: this.settingsService.getInquiryQuantity() });
    observable.subscribe(expressions => {
      this.store.dispatch(new AddExpressions(expressions));
    });
    return observable;
  }

  public updateExpression(expression: Expression): void {
    this.store.dispatch(new UpdateExpression(expression));
    this.sendFeedback(expression);
  }

  public sendFeedback(expression: Expression): Observable<any> {
    window.console.log(`InquiryService::sendFeedback would now send a POST request do update this expression: `, expression);
    // note that this will remove entries from db.json during development
    const observable = this.http.doPost(RestEndpoints.EXPRESSIONS, expression);
    // const observable = of(expression);

    observable.subscribe(expr => {
      window.console.log(`InquiryService::sendFeedback would now dispatch a RemoveExpression.`);
      this.store.dispatch(new RemoveExpression(expression));
    });
    return observable;
  }

  public getForeignMeaning(expression: Expression): string {
    return this.getMeaningByLanguage(expression, this.settingsService.getForeignLanguage());
  }

  public getNativeMeaning(expression: Expression): string {
    return this.getMeaningByLanguage(expression, this.settingsService.getLanguage());
  }

  public getPronunciation(expression: Expression, language: Language): string {
    const property: string = ['pronunciation_', language].join('');
    return expression[property];
  }

  private getUnansweredExpressions(): Expression[] {
    return this.expressions.filter(expression => !expression.isAnswered);
  }

  private getMeaningByLanguage(expression: Expression, language: Language): string {
    const property: string = ['meaning_', language].join('');
    return expression[property];
  }
}
