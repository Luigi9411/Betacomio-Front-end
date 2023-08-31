import { Component } from '@angular/core';
import { RegisterService } from 'src/app/feature/service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {

  // Remove the 'registers' array as it's not being used.
  singleNames: CompleteFormTwo | null = null;

  constructor(private reg: RegisterService, private router: Router) {}


  PostCredentials(usr: HTMLInputElement, pwd: HTMLInputElement) {
    this.reg.RegisterBetacomio(usr.value, pwd.value).subscribe(
      (resp) => {
        if (resp.status === 200) {
          // Registration was successful, you can navigate to a success page.
          console.log('Registration successful');
          this.router.navigate(['/register-details']);
        } else if (resp.status === 400) {
          alert('Invalid Request !!!');
        } else if(resp.status == 204){
          alert("Invalid Email or password");
        }
        else {
          // Handle other status codes as needed.
        }
      },
      (error) => {
        // Handle HTTP request errors here.
        console.error('HTTP request error:', error);
      }
    );
  }

  sendEmail(email : string) {
    this.reg.setEmail(email);
  }
}

export interface CompleteFormTwo {
  emailAddress: string;
  password: string;
}
