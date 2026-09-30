import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginResource } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: LoginResource): Observable<User> {
    const mockUser: User = {
      id: 'USR-01',
      email: credentials.email,
      name: 'Especialista QA',
      role: 'QA_SPECIALIST',
      token: 'jwt-mock-token-12345'
    };
    return of(mockUser).pipe(delay(400));
  }
}
