import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.css']
})
export class RegisterDetailComponent {
  updates: CompleteFormTwo[] = [];
  singleNames: CompleteFormTwo | null = null

  InsertForm(frm: NgForm) {
    this.updates.push(frm.value);
  }

}

export interface CompleteFormTwo {
  firstName: string;
  lastName: string;
  phone:number;
}
