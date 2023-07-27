import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { BicycleDetailsComponent } from './core/bicycle-details/bicycle-details.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "bycycle-details", component: BicycleDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
