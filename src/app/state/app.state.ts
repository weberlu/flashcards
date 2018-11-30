import { Session } from '../models/session.model';
import { Settings } from '../models/settings.model';
import { Todo } from '../models/todo.model';

export interface AppState {
  state: {
    session: Session,
    settings: Settings,
    // inquiry: {
    expressions: Array<Expression>,
    // }
    todos: Array<Todo>
  };
}

export const INITIAL_STATE: AppState = {
  state: {
    session: new Session(),
    settings: new Settings(),
    // inquiry: {
    expressions: [],
    // },
    todos: []
  }
};
