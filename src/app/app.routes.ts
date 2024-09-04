import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { ResetCodeComponent } from './layout/additions/reset-code/reset-code.component';
import { NewPasswordComponent } from './layout/additions/new-password/new-password.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { ShippingAddressComponent } from './layout/additions/shipping-address/shipping-address.component';
import { BrandDetailsComponent } from './layout/additions/brand-details/brand-details.component';
import { CategoryDetailsComponent } from './layout/additions/category-details/category-details.component';
import { GetAllOrdersComponent } from './layout/additions/get-all-orders/get-all-orders.component';
import { WishListComponent } from './layout/pages/wish-list/wish-list.component';

export const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'home',component:HomeComponent,canActivate:[authGuard]},
  {path:'cart',component:CartComponent,canActivate:[authGuard]},
  {path:'products',component:ProductsComponent,canActivate:[authGuard]},
  {path:'categories',component:CategoriesComponent,canActivate:[authGuard]},
  {path:'brands',component:BrandsComponent,canActivate:[authGuard]},
  {path:'shippingAddress/:cartId',component:ShippingAddressComponent,canActivate:[authGuard]},
  {path:'brandDetails/:brandId',component:BrandDetailsComponent,canActivate:[authGuard]},
  {path:'CategoryDetails/:CategoryId',component:CategoryDetailsComponent,canActivate:[authGuard]},
  {path:'allorders',component:GetAllOrdersComponent,canActivate:[authGuard]},
  {path:'wishlist',component:WishListComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'resetCode',component:ResetCodeComponent},
  {path:'newPassword',component:NewPasswordComponent},
  {path:'productDetails/:id',component:ProductDetailsComponent,canActivate:[authGuard]},
  {path:'**',component:NotfoundComponent}

];
