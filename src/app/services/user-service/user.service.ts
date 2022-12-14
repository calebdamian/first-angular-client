import { Injectable } from '@angular/core';
//aqui surge la consulta a la API para mostrar los datos
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { JWT_NAME } from '../auth-service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // se utilizan las rutas de la API
  // creación de objeto http que permitirá ejecutar operaciones de este tipo

  BASE_URL: string = 'http://127.0.0.1:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.BASE_URL}/users`, this.httpOptions)
      .pipe(map((results: any) => results.users, catchError(this.handleError)));
  }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/user/${id}`, this.httpOptions);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/user/signup`, user);
  }
  deleteUser(id?: number) {
    return this.http.delete<User>(`${this.BASE_URL}/user/${id}`);
  }
  updateUser(user: User, id?: number) {
    return this.http.put<User>(`${this.BASE_URL}/user/${id}`, user);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.status}`
      );
    }
    return throwError(() => new Error('Error.'));
  }
}
