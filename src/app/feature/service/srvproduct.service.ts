import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SrvproductService {
  cred?: Credentials;
  headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
private headerOptionsSubject: BehaviorSubject<HttpHeaders>;
public headerOptions$: Observable<HttpHeaders>;

constructor(private http: HttpClient) {
  this.headerOptionsSubject = new BehaviorSubject<HttpHeaders>(this.headerOptions);
  this.headerOptions$ = this.headerOptionsSubject.asObservable();
}

  LoginBetacomio(user: string, pwd: string) {
    this.cred = { username: user, password: pwd};
    return this.http.post('https://localhost:7139/api/Login', this.cred, {
      observe: 'response',
    });
  }

  SetAuthorizationToken(user: string, pwd: string) {
    this.headerOptions = this.headerOptions.set(
      'Authorization',
      'Basic ' + window.btoa(user + ':' + pwd)
    );
  
    this.headerOptionsSubject.next(this.headerOptions);
  
    sessionStorage.setItem("AuthBasic", "Basic " + window.btoa(user + ':' + pwd));
  }

  //logout metodo
  logout() {
    // Rimuovi il token di autenticazione e altre informazioni dell'utente
    sessionStorage.removeItem("AuthBasic")
    sessionStorage.removeItem('Role');

    // Reindirizza l'utente alla pagina di login o ad un'altra pagina appropriata

  }
}


interface Credentials {
  username: string;
  password: string;
}

