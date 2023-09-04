import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'; //s

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
  private Email = new BehaviorSubject<string>('');
  private baseUrl = 'https://localhost:7139/api/Customers';
  private emptyVariable: string = "";

  constructor(private http: HttpClient) {}

  RegisterBetacomio(username: string, password: string): Observable<any> {
    const role: string = 'User';
    const body = { EmailAddress: username, PasswordHash: password, Role: role };

    // Assuming your registration endpoint is '/api/register' - adjust as needed.
    return this.http.post('https://localhost:7139/api/NewCustomers', body, {
      headers: this.headerOptions,
      observe: 'response' // To get the full HTTP response, including the status code.
    });
  }

  RegisterBetacomioAdmin(username: string, password: string, role: string): Observable<any> {
    const body = { EmailAddress: username, PasswordHash: password, Role: role };

    // Assuming your registration endpoint is '/api/register' - adjust as needed.
    return this.http.post('https://localhost:7139/api/NewCustomers', body, {
      headers: this.headerOptions,
      observe: 'response' // To get the full HTTP response, including the status code.
    });
  }

  RegisterBetacomio2(name: string, surname: string, phone: string, email: string) : Observable<any>{
    const body = { FirstName: name, LastName: surname, Phone: phone, passwordHash: this.emptyVariable, passwordSalt: this.emptyVariable};
    const url = `${this.baseUrl}/PutCustomerByEmail/${email}`;

    return this.http.put(url, body, {
      headers: this.headerOptions,
      observe: 'response'
    });

  }

  getCustomerDataByEmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/GetCustomerByEmail/${email}`;
    return this.http.get(url);
  }


  setEmail(EmailAddress: string) {
    this.Email.next(EmailAddress);
  }

  getEmail() {
    return this.Email.asObservable();
  }
}
