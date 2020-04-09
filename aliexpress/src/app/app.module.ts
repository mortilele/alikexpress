import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { FeaturesComponent } from './features/features.component';
import {LazyLoadScriptService} from './lazyloadscript.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { AccountPageComponent } from './account-page/account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    HomeBannerComponent,
    HomepageComponent,
    NewProductsComponent,
    TopProductsComponent,
    FeaturesComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AccountPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [LazyLoadScriptService, AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
