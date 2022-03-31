import { Component, OnInit } from '@angular/core';
import {map, Observable} from 'rxjs';
import {TodosService} from '../../services/todos.service';
import {FilterEnum} from '../../types/filter.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todoService: TodosService) {
    this.activeCount$ = this.todoService.todos$.pipe(map(todos => {
      return todos.filter(todo => !todo.isCompleted).length;
    }));
    this.itemsLeftText$ = this.activeCount$.pipe(map(items => {
        return `item${items !== 1 ? '(s)' : ''} left`;
    }));
    this.noTodosClass$ = this.todoService.todos$.pipe(map(todos => {
      return todos.every(todo => todo.isCompleted);
    }));
    this.filter$ = this.todoService.filter$;
  }

  ngOnInit(): void {
  }

  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todoService.changeFilter(filterName);
  }

}
