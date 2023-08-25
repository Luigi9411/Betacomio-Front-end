import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { SrvproductService } from 'src/app/feature/service/srvproduct.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logs: CompleteForm[] = [];
  singleNames: CompleteForm | null = null

  constructor(private srv: SrvproductService) {}

  GetCredentials(usr: HTMLInputElement, pwd:HTMLInputElement ) {
    this.srv.LoginBetacomio(usr.value, pwd.value).subscribe((resp) => {
      switch (resp.status) {
        case HttpStatusCode.Ok:
          this.srv.SetAuthorizationToken(usr.value,pwd.value)
          break;
        case HttpStatusCode.BadRequest:
          alert('Invalid Request !!!');
          break;
      }
    })
  }

  InsertForm(frm: NgForm) {
    this.logs.push(frm.value);
  }
}

export interface CompleteForm {
  emailAddress: string;
  password: string;
}


