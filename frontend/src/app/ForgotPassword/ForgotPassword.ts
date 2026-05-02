import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Auth } from '../Services/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  imports: [FormField],
})
export class ForgotPassword {
  userAuth = inject(Auth);

  forgotModel = signal({
    email: '',
  });

  forgotPasswordForm = form(this.forgotModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.forgotPasswordForm, async () => {
      const credentials = this.forgotModel();
      console.log('Forgot Password submitted with credentials:', credentials);
      this.userAuth.forgotPassword(credentials.email).subscribe({
        next: (response) => {
          console.log('Forgot Password successful:', response);
        },
        error: (error) => {
          console.error('Forgot Password failed:', error);
        },
      });
    });
  }
}
