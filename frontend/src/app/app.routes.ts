import { Routes } from '@angular/router';
import { Login } from './Login/Login';
import { Signup } from './Signup/Signup';
import { ErrorContext } from './Error/ErrorContext';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'forgot-password', component: ForgotPassword },
  { path: '**', component: ErrorContext },
];
