import { Action } from '@ngrx/store';

export enum ExpressionActionTypes {
  ADD_EXPRESSIONS = 'ADD_EXPRESSIONS',
  UPDATE_EXPRESSION = 'UPDATE_EXPRESSION',
  REMOVE_EXPRESSION = 'REMOVE_EXPRESSION'
}

export class AddExpressions implements Action {
  readonly type = ExpressionActionTypes.ADD_EXPRESSIONS;
  constructor(public payload: Array<Expression>) {}
}

export class UpdateExpression implements Action {
  readonly type = ExpressionActionTypes.UPDATE_EXPRESSION;
  constructor(public payload: Expression) {}
}

export class RemoveExpression implements Action {
  readonly type = ExpressionActionTypes.REMOVE_EXPRESSION;
  constructor(public payload: Expression) {}
}

export type ExpressionAction = AddExpressions | UpdateExpression | RemoveExpression;
