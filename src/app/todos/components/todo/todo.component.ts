import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {TodoInterface} from '../../types/todo.interface';
import {TodosService} from '../../services/todos.service';
import {map} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput') textInput!: ElementRef;

  editingText: string = '';

  constructor(private todoService: TodosService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isEditingProps'].currentValue) {
          setTimeout(() => {

          this.textInput.nativeElement.focus();
          },0);
        }
    }

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  setTodoIsEditMode() {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removedTodo(){
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTod() {
    this.todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event) {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  changeTodo() {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
