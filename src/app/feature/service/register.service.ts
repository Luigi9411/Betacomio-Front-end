import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headerOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  RegisterBetacomio(username: string, password: string): Observable<any> {
    const body = { EmailAddress: username, PasswordHash: password };

    // Assuming your registration endpoint is '/api/register' - adjust as needed.
    return this.http.post('https://localhost:7139/api/NewCustomers', body, {
      headers: this.headerOptions,
      observe: 'response' // To get the full HTTP response, including the status code.
    });
  }
}