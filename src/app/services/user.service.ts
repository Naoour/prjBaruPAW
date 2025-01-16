import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private url: string = 'http://localhost:3000/users/';
  // private url: string = environment.api + 'users/';
  private url: string = 'http://localhost:3000/users/';
  private subjectExecuteUser = new Subject<string>();

  constructor(public http: HttpClient) {}

  //observeable, subject
  executeUserListener() {
    return this.subjectExecuteUser.asObservable();
  }

  addUser(email: string, password: string) {
    const user: User = {
      _id: null,
      email: email,
      password: password,
    };

    this.http.post<{ message: string }>(this.url, user).subscribe({
      next: (response) => {
        console.log(response);
        this.subjectExecuteUser.next(response.message);
      },
      error: (error) => {
        console.log(error);
        this.subjectExecuteUser.next(error.error.message);
      }
    });
  }
}
