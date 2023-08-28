// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { HttpStatusCode } from '@angular/common/http';
// import { Router } from '@angular/router';
// @Injectable({
//   providedIn: 'root'
// })
// export class SrvproductService {
//   cred?: Credentials;
//   cred2?: Credentials2
//   headerOptions = new HttpHeaders().set('Content-Type', 'application/json');

//   constructor(private http: HttpClient, private route: Router) {}

//   LoginBetacomio(user: string, pwd: string): Observable<HttpResponse<any>> {
//     this.cred = { username: user, password: pwd};
//     return this.http.post('https://localhost:7139/api/Login', this.cred, {
//       observe: 'response',
//     }).pipe(
//       catchError((error: HttpErrorResponse) => {
//         // Gestisci l'errore e restituisci un oggetto di risposta con lo stato corretto
//         return of(new HttpResponse({ status: HttpStatusCode.BadRequest }));
//       })
//     );
//   }

// RegisterBetacomio(user: string, pwd: string): Observable<HttpResponse<any>> {
//   const cred2 = { username: user, password: pwd };

//   return this.http.post('https://localhost:7139/api/NewCustomers', cred2, {
//     observe: 'response',
//   }).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 0) {
//         // Gestisci l'errore di connessione rifiutata e mostra un messaggio all'utente
//         alert("Il server API non è avviato.");
//       }
//       return of(new HttpResponse({ status: HttpStatusCode.BadGateway }));
//     })
//   );
// }


//   SetAuthorizationToken(user: string, pwd: string) {
//     this.headerOptions = this.headerOptions.set(
//       'Authorization',
//       'Basic' + window.btoa(user + ':' + pwd)
//     );

//     sessionStorage.setItem("AuthBasic","Basic" + window.btoa(user + ':' + pwd))
//   }
// }

// interface Credentials {
//   username: string;
//   password: string;
// }

// interface Credentials2 {
//   CustomerId: number;
//   EmailAddress: string;
//   PasswordHash: string;
//   PasswordSalt: string;
//   Role: string;
// }

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
    return this.http.post('https://localhost:7139/api/Login', this.cred, {
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
