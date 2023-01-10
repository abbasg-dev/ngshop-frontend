import { Injectable } from '@angular/core';
import { User } from '../../models/user';

const TOKEN = 'jwt';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }

  getToken() {
    return localStorage.getItem(TOKEN)
  }

  removeToken() {
    localStorage.removeItem(TOKEN)
  }

  setUser(data: User) {
    localStorage.setItem(USER, JSON.stringify(data));
  }

  getUser() {
    return localStorage.getItem(USER);
  }

  removeUser() {
    localStorage.removeItem(USER);
  }

}
