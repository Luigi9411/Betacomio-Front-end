import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SrvproductService {
  cred?: Credentials;
  headerOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  LoginBetacomio(user: string, pwd: string) {
    this.cred = { username: user, password: pwd};
    return this.http.post('https://localhost:7139/api/Products', this.cred, {
      observe: 'response',
    });
  }

  SetAuthorizationToken(user: string, pwd: string) {
    this.headerOptions = this.headerOptions.set(
      'Authorization',
      'Basic' + window.btoa(user + ':' + pwd)
    );

    sessionStorage.setItem("AuthBasic","Basic" + window.btoa(user + ':' + pwd))
  }
}

interface Credentials {
  username: string;
  password: string;
}
