import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { LocalstorageService, UserAuthenticated } from '@blackbits/users';
import { Router } from '@angular/router';
import { SocialUser } from '@blackbits/users';
@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  apiURLAuth = environment.apiURL + 'auth';

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router,
  ) { }

  login(email: string, password: string): Observable<UserAuthenticated> {
    return this.http.post<UserAuthenticated>(`${this.apiURLAuth}/signin`, { email, password });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
  
  loginWithGoogle(idToken: string): Observable<SocialUser> {
    return this.http.post<SocialUser>(`${this.apiURLAuth}/google-login`, { idToken });
  }
  
  loginWithFacebook(id: string, authToken: string): Observable<SocialUser> {
    return this.http.post<SocialUser>(`${this.apiURLAuth}/facebook-login`, { id, authToken });
  }
}
