import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { SrvproductService } from 'src/app/feature/service/srvproduct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logs: CompleteForm[] = [];
  singleNames: CompleteForm | null = null

  constructor(private srv: SrvproductService, private router: Router) {}

  // GetCredentials(usr: HTMLInputElement, pwd:HTMLInputElement ) {
  //   this.srv.LoginBetacomio(usr.value, pwd.value).subscribe((resp) => {
  //     switch (resp.status) {
  //       case HttpStatusCode.Ok:
  //         this.srv.SetAuthorizationToken(usr.value,pwd.value)
  //         break;
  //       case HttpStatusCode.BadRequest:
  //         alert('Invalid Request !!!');
  //         break;
  //     }
  //   })
  // }
  GetCredentials(usr: HTMLInputElement, pwd: HTMLInputElement) {
    this.srv.LoginBetacomio(usr.value, pwd.value).subscribe((resp) => {
      switch (resp.status) {
        case HttpStatusCode.Ok:
          this.srv.SetAuthorizationToken(usr.value, pwd.value);
          sessionStorage.setItem('Role', "User");
          sessionStorage.setItem('Role', "User");
          this.router.navigate(['/']); // Reindirizza l'utente alla pagina "home"
          break;
          case HttpStatusCode.NoContent:
          this.srv.SetAuthorizationToken(usr.value, pwd.value);
          sessionStorage.setItem('Role', "Admin");
        alert('Effettuato il login');
        this.router.navigate(['/']);
        break;

      } 
    }, (error) => {
      // Handle HTTP request errors here.
      //Qui sto gestendo le risposte http di errore
      //se è bad request vuol dire che le credenziali non matchano
      //se è not found vuol dire che esiste nella tabella vecchia ma non in quella nuova
      if(error.status == HttpStatusCode.BadRequest){
        alert('Invalid Request !!!');
      } else if (error.status == HttpStatusCode.NotFound) {
        alert('You are registered as an old user. To continue register again with the same Email and password.');
        this.router.navigate(['/register']);
      }
    }
    );
  }


  isAdmin(): boolean {
    const userRole = sessionStorage.getItem("Role");
    return userRole === "Admin";
  }

  isUser(): boolean {
    const userRole = sessionStorage.getItem("Role");
    return userRole === "User";
  }

  InsertForm(frm: NgForm) {
    this.logs.push(frm.value);
  }
}

export interface CompleteForm {
  emailAddress: string;
  password: string;
}










