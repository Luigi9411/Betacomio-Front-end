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
  showAlert = false;
  showAlert2 = false;
  showAlert3 = false;

  constructor(private srv: SrvproductService, private router: Router) {}

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
          this.showAlertMessage();
        break;

      }
    }, (error) => {
      // Handle HTTP request errors here.
      //Qui sto gestendo le risposte http di errore
      //se è bad request vuol dire che le credenziali non matchano
      //se è not found vuol dire che esiste nella tabella vecchia ma non in quella nuova
      if(error.status == HttpStatusCode.BadRequest){
        this.showAlertMessage2('message 1')
      } else if (error.status == HttpStatusCode.NotFound) {
        this.showAlertMessage2('message 2')
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

  showAlertMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.router.navigate(['/']);
    }, 1000);
  }

  showAlertMessage2(message: string) {
    if(message == 'message 1'){
      this.showAlert2 = true;
      setTimeout(() => {
        this.showAlert2 = false;
      }, 1000);
    }else if (message == 'message 2') {
      this.showAlert3 = true;
      setTimeout(() => {
        this.showAlert3 = false;
      }, 1000);
    }
  }

}

export interface CompleteForm {
  emailAddress: string;
  password: string;
}



















