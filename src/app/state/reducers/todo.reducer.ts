import { Todo } from '../../models/todo.model';
import { INITIAL_STATE } from '../app.state';
import { DeepCopyService } from '../../services/deepcopy.service';
import { TodoAction, TodoActionTypes } from '../actions/todo.action';

export function todoReducer(state: Todo[] = INITIAL_STATE.state.todos, action: TodoAction) {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return DeepCopyService.cloneAndAdd(state, action.payload);

    case TodoActionTypes.TOGGLE_TODO:
      const objects = DeepCopyService.clone(state);
      const todo = objects.find(o => o.id === action.payload.id);
      const index = objects.indexOf(todo);
      return [...objects.slice(0, index),
        Object.assign({}, todo, { isCompleted: !todo.isCompleted }),
        ...objects.slice(index + 1)];

    case TodoActionTypes.REMOVE_TODO:
      return DeepCopyService.cloneAndRemove(state, action.payload);

    case TodoActionTypes.REMOVE_ALL_TODOS:
      return [];

    default:
      return state;
  }
}
