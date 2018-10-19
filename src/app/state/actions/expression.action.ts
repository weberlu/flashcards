import { Action } from '@ngrx/store';
import { Expression } from '../../models/expression.model';

export enum ExpressionActionTypes {
  ADD_EXPRESSIONS = 'ADD_EXPRESSIONS',
  UPDATE_EXPRESSION = 'UPDATE_EXPRESSION',
  REMOVE_EXPRESSIONS = 'REMOVE_EXPRESSIONS'
}

export class AddExpressions implements Action {
  readonly type = ExpressionActionTypes.ADD_EXPRESSIONS;
  constructor(public payload: Array<Expression>) {}
}

export class UpdateExpression implements Action {
  readonly type = ExpressionActionTypes.UPDATE_EXPRESSION;
  constructor(public payload: Expression) {}
}

export class RemoveExpressions implements Action {
  readonly type = ExpressionActionTypes.REMOVE_EXPRESSIONS;
  constructor(public payload: Array<Expression>) {}
}

export type ExpressionAction = AddExpressions | UpdateExpression | RemoveExpressions;
