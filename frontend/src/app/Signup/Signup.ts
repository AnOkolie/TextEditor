import { Component, inject, signal } from '@angular/core';
import { FormField, required, form, submit } from '@angular/forms/signals';
import { Auth } from '../Services/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  imports: [FormField],
})
export class Signup {
  userAuth = inject(Auth);

  signupModel = signal({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  signupForm = form(this.signupModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    required(fieldPath.username, { message: 'Username is required' });
    required(fieldPath.password, { message: 'Password is required' });
    required(fieldPath.confirmPassword, { message: 'Confirm Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.signupForm, async () => {
      const credentials = this.signupModel();
      if (credentials.password !== credentials.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      this.userAuth
        .signup(credentials.email, credentials.password, credentials.username)
        .subscribe({
          next: (response) => {
            console.log('Signup successful:', response);
          },
          error: (error) => {
            console.error('Signup failed:', error);
          },
        });
    });
  }
}
