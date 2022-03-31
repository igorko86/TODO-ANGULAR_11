import {BehaviorSubject, map} from 'rxjs';
import {TodoInterface} from '../types/todo.interface';
import {FilterEnum} from '../types/filter.enum';

export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  constructor() { }

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      id: Date.now().toString(),
      text,
      isCompleted: false
    }
    const updatedTodos = [...this.todos$.getValue(), newTodo];

    this.todos$.next(updatedTodos);
  }

  allSelected(isCompleted: boolean) {
    const updatedTodos = this.todos$.getValue().map(todo =>({...todo, isCompleted}));

    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string) {
    const updatedTodos = this.todos$.getValue().map(todo =>{
      if(todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }

      return todo;
    });

    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum) {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string) {
    const updatedTodos = this.todos$.getValue().map(todo =>{
      if(todo.id === id) {
        return {
          ...todo,
          text
        }
      }

      return todo;
    });

    this.todos$.next(updatedTodos);
  }

  removeTodo(id: string) {
    const updatedTodos = this.todos$.getValue().filter(todo =>todo.id !== id);

    this.todos$.next(updatedTodos);
  }

}
