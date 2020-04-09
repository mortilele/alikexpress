import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth.guard';
import {AccountPageComponent} from './account-page/account-page.component';


const routes: Routes = [
  { path: 'store', component: ProductListComponent},
  { path: '', component: HomepageComponent},
  { path: 'store/:id', component: ProductListComponent},
  { path: 'store/products/:id', component: ProductDetailComponent},
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: AccountPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
