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
    return this.http.get<User[]>('http://localhost:3004/users');
  }
  getUser(id: string) {
    return this.http.get<User>(`http://localhost:3004/users/${id}`);
  }
  addUser(user: User) {
    console.log('request');
    return this.http.post<User>('http://localhost:3004/users', user);
  }
  updateUser(user: User) {
    return this.http.patch<User>(`http://localhost:3004/users/${user.id}`, user);
  }
  deleteUser(id: string) {
    return this.http.delete<User>(`http://localhost:3004/users/${id}`);
  }
  login(loginInput: LoginInput) {
    return this.http.post<LoginResult>(`${Utility.serverUrl}/login`,loginInput);
  }
  register(registerInput: RegisterInput) {
    return this.http.post<LoginResult>(`${Utility.serverUrl}/register`,registerInput);
  }
}
