import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/core/login/login.component';
import { CustomersComponent } from '../app/feature/customers/customers.component';
import { ProductsComponent } from './feature/products/products.component';
import { ProductDetailsComponent } from './feature/products-detail/products-detail.component';
import { HomeComponent } from './core/home/home.component';
import { BicycleDetailsComponent } from './core/bicycle-details/bicycle-details.component';
import { CartComponent } from './feature/cart/cart.component';
import { RegisterComponent } from './feature/register/register.component';
import { RegisterDetailComponent } from './feature/register-detail/register-detail.component';
import { RegisterAdminComponent } from './feature/register-admin/register-admin.component';
import { RegisterAdminDetailComponent } from './feature/register-admin-detail/register-admin-detail.component';
import { AdminPageComponent } from './core/admin-page/admin-page.component';
import { AdminCustomersComponent } from './core/admin-customers/admin-customers.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "products", component: ProductsComponent},
  {path: "product-details/:id", component: ProductDetailsComponent},
  {path: "customers", component: CustomersComponent},
  {path: "bycycle-details", component: BicycleDetailsComponent},
  { path: 'cart', component: CartComponent },
  {path: "register", component: RegisterComponent},
  {path: "register-details", component: RegisterDetailComponent},
  {path: "register-admin", component: RegisterAdminComponent},
  {path: "register-admin-details", component: RegisterAdminDetailComponent},
  {path: "admin-page", component: AdminPageComponent},
  {path: "admin-customers", component: AdminCustomersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
