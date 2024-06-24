import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput } from '@models/login-input';
import { LoginResult } from '@models/login-result';
import { RegisterInput } from '@models/register-input';
import { User } from '@models/user';
import { Utility } from 'app/shared/utility';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<User[]>(`${Utility.serverUrl}/users`);
  }
  getUser(id: string) {
    return this.http.get<User>(`${Utility.serverUrl}/users/${id}`);
  }
  addUser(user: User) {
    console.log('request');
    return this.http.post<User>(`${Utility.serverUrl}/users`, user);
  }
  updateUser(user: User) {
    return this.http.patch<User>(`${Utility.serverUrl}/users/${user.id}`, user);
  }
  deleteUser(id: string) {
    return this.http.delete<User>(`${Utility.serverUrl}/users/${id}`);
  }
  login(loginInput: LoginInput) {
    return this.http.post<LoginResult>(`${Utility.serverUrl}/login`,loginInput);
  }
  register(registerInput: RegisterInput) {
    return this.http.post<any>(`${Utility.serverUrl}/register`,registerInput);
  }
}
