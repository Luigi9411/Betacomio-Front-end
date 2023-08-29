import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/feature/service/register.service';


@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.css']
})
export class RegisterDetailComponent implements OnInit{
  updates: CompleteFormTwo[] = [];
  singleNames: CompleteFormTwo | null = null
  receivedEmail: string = '';

  constructor(private reg: RegisterService) {}

  InsertForm(frm: NgForm) {
    this.updates.push(frm.value);
  }

  PutCredentials(name: HTMLInputElement, surname: HTMLInputElement, phone: HTMLInputElement){

    alert(this.receivedEmail);
    this.reg.RegisterBetacomio2(name.value, surname.value, phone.value, this.receivedEmail).subscribe(
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

  ngOnInit() {
    this.receiveEmail();
  }

  receiveEmail(){
    this.reg.getEmail().subscribe((email) => {
      this.receivedEmail = email
    })
  }

}

export interface CompleteFormTwo {
  firstName: string;
  lastName: string;
  phone:number;
}
