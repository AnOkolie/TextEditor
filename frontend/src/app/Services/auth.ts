import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const api_url = `${import.meta.env['NG_APP_BASE_URL']}/auth/login`;
    return this.http.post(api_url, { email, password }, {observe: 'response'});
  }

  signup(email: string, password: string, name: string) {
    const api_url = `${import.meta.env['NG_APP_BASE_URL']}/auth/signup`;
    return this.http.post(api_url, { email, password, name }, {observe: 'response'});
  }

  forgotPassword(email: string) {
    const api_url = `${import.meta.env['NG_APP_BASE_URL']}/auth/forgot-password`;
    return this.http.post(api_url, { email }, {observe: 'response'});
  }
}
