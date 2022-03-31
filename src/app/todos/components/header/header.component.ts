import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  text = '';

  constructor(private todoService: TodosService) {
    this.todoService.todos$.subscribe((todos) =>{
      console.log(todos)
    })
  }

  ngOnInit(): void {
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;

    this.text = target.value;
  }

  addText() {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
