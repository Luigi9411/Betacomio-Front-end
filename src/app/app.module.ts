import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './core/login/login.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SliderComponent } from './core/slider/slider.component';
import { SectionTopComponent } from './core/section-top/section-top.component';
import { HomeComponent } from './core/home/home.component';
import { SectionTwoComponent } from './core/section-two/section-two.component';
import { SectionThreeComponent } from './core/section-three/section-three.component';
import { SectionFourComponent } from './core/section-four/section-four.component';
import { SectionFiveComponent } from './core/section-five/section-five.component';
import { BicycleDetailsComponent } from './core/bicycle-details/bicycle-details.component';
import { FooterComponent } from './core/footer/footer.component';
import { CustomersComponent } from './feature/customers/customers.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './feature/products/products.component';
import { ProductDetailsComponent } from './feature/products-detail/products-detail.component';
import { CartComponent } from './feature/cart/cart.component';
import { RegisterComponent } from './feature/register/register.component';
import { RegisterDetailComponent } from './feature/register-detail/register-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SliderComponent,
    SectionTopComponent,
    HomeComponent,
    SectionTwoComponent,
    SectionThreeComponent,
    SectionFourComponent,
    SectionFiveComponent,
    BicycleDetailsComponent,
    FooterComponent,
    CustomersComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    RegisterComponent,
    RegisterDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

