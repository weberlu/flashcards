import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Todo } from '../../models/todo.model';
import { AddTodo, RemoveAllTodos, RemoveTodo, ToggleTodo } from '../../state/actions/todo.action';
import { StoreKey } from '../../state/store.config';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Array<Todo>;

  model: Todo = {
    id: 0,
    description: '',
    responsible: '',
    priority: 'low',
    isCompleted: false
  };

  constructor(private store: Store<AppState>) {
    /*
     * This one is used with Observables
     *   --> don't forget AsyncPipe in html file!
     */
    // this.todos$ = this.store.select('todos');

    /*
     * This is used when we don't want to work with Observables
     *   --> no AsyncPipe required in html.
     */
    this.store.select(StoreKey).subscribe((state => this.todos = state.todos));
  }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new AddTodo(this.model));
    this.model = new Todo();
  }

  toggleTodo(todo) {
    this.store.dispatch(new ToggleTodo(todo));
  }

  removeTodo(todo) {
    this.store.dispatch(new RemoveTodo(todo));
  }

  clearTodos() {
    this.store.dispatch(new RemoveAllTodos());
  }
}
