import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registers: CompleteForm[] = [];
  singleNames: CompleteForm | null = null

  InsertForm(frm: NgForm) {
    this.registers.push(frm.value);
  }
}

export interface CompleteForm {
  emailAddress: string;
  password: string;
}
