// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Models
import { User } from 'src/app/models/user.model';
// Config
import { LINK_SERVICE } from '../../config/config';
// RxJS
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {}

  createUser(user: User) {
    const URL = LINK_SERVICE + '/user';

    return this.http.post(URL, user)
      .pipe(
        map((resp: any) => {
          swal('Listo!', `El usuario ${ user.email } ha sido creado`, 'success');
          return resp.user;
        })
      );
  }

  login(user: User, rememberme: boolean = false) {
    const URL = LINK_SERVICE + '/login';

    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL, user)
      .pipe(
        map((resp: any) => {
          localStorage.setItem( 'id', resp.id );
          localStorage.setItem( 'token', resp.token );
          localStorage.setItem( 'user', JSON.stringify(resp.userDB) );

          return resp.userDB;
        })
      );
  }
}