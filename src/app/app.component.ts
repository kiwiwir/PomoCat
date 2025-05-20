import { Component } from '@angular/core';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TodolistComponent } from './todolist/todolist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PomodoroComponent, TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PomoCat';
}
