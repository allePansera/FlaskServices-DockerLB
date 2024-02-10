import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthPolicyGuard } from './guards/auth/auth.guard';

import {HomepageComponent} from "./component/homepage/homepage.component";
import {UserRegistryComponent} from "./component/user-registry/user-registry.component";
import {LoginComponent} from "./component/login/login.component";
import {ProductRegistryComponent} from "./component/product-registry/product-registry/product-registry.component";
import {CategoryRegistryComponent} from "./component/category-registry/category-registry/category-registry.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', component: HomepageComponent, canActivate: [AuthPolicyGuard]},
  {path: 'registry/user', component: UserRegistryComponent, canActivate: [AuthPolicyGuard]},
  {path: 'registry/product', component: ProductRegistryComponent, canActivate: [AuthPolicyGuard]},
  {path: 'registry/category', component: CategoryRegistryComponent, canActivate: [AuthPolicyGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
