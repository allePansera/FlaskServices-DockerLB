import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthPolicyGuard } from './guards/auth/auth.guard';
import {HomepageComponent} from "./component/homepage/homepage.component";
import {UserRegistryComponent} from "./component/user-registry/user-registry.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', component: HomepageComponent, canActivate: [AuthPolicyGuard]},
  {path: 'anagrafica_base', component: UserRegistryComponent, canActivate: [AuthPolicyGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
