import { INITIAL_STATE } from '../app.state';
import { DeepCopyService } from '../../services/deepcopy.service';
import { ExpressionAction, ExpressionActionTypes } from '../actions/expression.action';

export function expressionReducer(state: Expression[] = INITIAL_STATE.state.expressions, action: ExpressionAction) {
  switch (action.type) {
    case ExpressionActionTypes.ADD_EXPRESSIONS:
      const oldItems = DeepCopyService.clone(state);
      const newItems = DeepCopyService.clone(action.payload);
      return oldItems.concat(newItems);

    case ExpressionActionTypes.UPDATE_EXPRESSION:
      const objects: Array<Expression> = DeepCopyService.clone(state);
      const item: Expression = objects.find(o => o.id === action.payload.id);
      const index = objects.indexOf(item);
      return [...objects.slice(0, index),
        Object.assign({}, action.payload),
        ...objects.slice(index + 1)];

    case ExpressionActionTypes.REMOVE_EXPRESSION:
      return DeepCopyService.cloneAndRemove(state, action.payload);

    default:
      return state;
  }
}
