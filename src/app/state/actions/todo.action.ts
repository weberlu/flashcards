import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

export enum TodoActionTypes {
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  REMOVE_ALL_TODOS = 'RMEOVE_ALL_TODOS'
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.ADD_TODO;
  constructor(public payload: Todo) {}
}

export class ToggleTodo implements Action {
readonly type = TodoActionTypes.TOGGLE_TODO;
  constructor(public payload: Todo) {}
}

export class RemoveTodo implements Action {
  readonly type = TodoActionTypes.REMOVE_TODO;
  constructor(public payload: Todo) {}
}

export class RemoveAllTodos implements Action {
  readonly type = TodoActionTypes.REMOVE_ALL_TODOS;
}

export type TodoAction = AddTodo | ToggleTodo | RemoveTodo | RemoveAllTodos;
