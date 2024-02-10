import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.USERS_API_URL

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

  refreshToken() {
    return this.http.get<any>(`${this.apiUrl}/refresh-token`, { withCredentials: true })
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
  }

  getUser(email: string) {
    return this.http.post<User>(`${this.apiUrl}/getUser`, { email }, { withCredentials: true })
  }

  saveUserToLocalStorage(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }

  logout() {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
  }
}
