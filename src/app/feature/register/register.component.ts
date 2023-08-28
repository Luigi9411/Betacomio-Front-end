import { Component } from '@angular/core';
import { RegisterService } from 'src/app/feature/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Remove the 'registers' array as it's not being used.
  singleNames: CompleteFormTwo | null = null;

  constructor(private reg: RegisterService) {}


  PostCredentials(usr: HTMLInputElement, pwd: HTMLInputElement) {
    this.reg.RegisterBetacomio(usr.value, pwd.value).subscribe(
      (resp) => {
        if (resp.status === 200) {
          // Registration was successful, you can navigate to a success page.
          console.log('Registration successful');
        } else if (resp.status === 400) {
          alert('Invalid Request !!!');
        } else {
          // Handle other status codes as needed.
        }
      },
      (error) => {
        // Handle HTTP request errors here.
        console.error('HTTP request error:', error);
      }
    );
  }
}

export interface CompleteFormTwo {
  emailAddress: string;
  password: string;
}