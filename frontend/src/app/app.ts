import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './Login/Login';
import { Signup } from './Signup/Signup';

@Component({
  selector: 'app-root',
  imports: [Login, Signup, RouterOutlet],
  template: ` <router-outlet /> `,
  styleUrl: './app.css',
})
export class App {
  title = 'text-editor';
}
