import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/core/login/login.component';
import { CustomersComponent } from '../app/feature/customers/customers.component';
import { ProductsComponent } from './feature/products/products.component';
import { HomeComponent } from './core/home/home.component';
import { BicycleDetailsComponent } from './core/bicycle-details/bicycle-details.component';
import { CartComponent } from './feature/cart/cart.component';
import { RegisterComponent } from './feature/register/register.component';
import { RegisterDetailComponent } from './feature/register-detail/register-detail.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "products", component: ProductsComponent},
  {path: "customers", component: CustomersComponent},
  {path: "bycycle-details", component: BicycleDetailsComponent},
  { path: 'cart', component: CartComponent },
  {path: "register", component: RegisterComponent},
  {path: "register-details", component: RegisterDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
