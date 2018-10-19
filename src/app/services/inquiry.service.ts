import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddExpressions, RemoveExpressions, UpdateExpression } from '../state/actions/expression.action';
import { AppState } from '../state/app.state';
import { Expression } from '../models/expression.model';
import { StoreKey } from '../state/store.config';
import { RestEndpoints, RestHttpService } from './rest.http.service';
import { SettingsService } from './settings.service';

@Injectable()
export class InquiryService {
  private expressions: Array<Expression>;

  constructor(private store: Store<AppState>, private http: RestHttpService, private settings: SettingsService) {
    this.store.select(StoreKey).subscribe(state => this.expressions = state.expressions);
  }


  public hasUnansweredExpressions() {
    return this.expressions.filter(expression => expression.isAnswered !== true).length > 0;
  }

  public loadExpressions(): void {
    this.http.doGet(RestEndpoints.EXPRESSIONS, { quantity: this.settings.getInquiryQuantity() }).subscribe((expressions) => {
      this.store.dispatch(new AddExpressions(expressions));
    });
  }

  public updateExpression(expression: Expression): void {
    this.store.dispatch(new UpdateExpression(expression));
    this.sendFeedback();
  }


  public sendFeedback(): void {
    if (!this.hasUnansweredExpressions()) {
      this.http.doPost(RestEndpoints.EXPRESSION, this.expressions).subscribe((expressions: Array<Expression>) => {
        this.store.dispatch(new RemoveExpressions(expressions));
      });
    }
  }
}
