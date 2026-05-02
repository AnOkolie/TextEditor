import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Auth } from '../Services/auth';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [FormField],
})
export class Login<LoginData> {
  userAuth = inject(Auth);
  loginModel = signal({
    email: '',
    password: '',
  });
  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    required(fieldPath.password, { message: 'Password is required' });
  });
  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const credentials = this.loginModel();
      console.log('Login submitted with credentials:', credentials);
      this.userAuth.login(credentials.email, credentials.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    });
  }
}
