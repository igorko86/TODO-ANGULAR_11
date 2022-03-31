import { Component, OnInit } from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {TodoInterface} from '../../types/todo.interface';
import {TodosService} from '../../services/todos.service';
import {FilterEnum} from '../../types/filter.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllSelected$: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodosService) {
    this.isAllSelected$ = this.todosService.todos$.pipe(map(todos => todos.every(todo => todo.isCompleted)));
    this.noTodoClass$ = this.todosService.todos$.pipe(map((todos) => todos.length === 0));
    this.visibleTodos$ = combineLatest( [this.todosService.todos$, this.todosService.filter$]).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
      let filteredTodos = todos;

      if (filter === FilterEnum.completed) {
        filteredTodos = todos.filter((todo) =>todo.isCompleted)
      } else if (filter === FilterEnum.active) {
        filteredTodos = todos.filter((todo) =>!todo.isCompleted)
      }

      return filteredTodos;
    }))
  }

  ngOnInit(): void {
  }

  allSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    this.todosService.allSelected(target.checked);
  }

  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }
}
