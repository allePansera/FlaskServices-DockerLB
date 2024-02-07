import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthPolicyGuard } from './guards/auth/auth.guard';
import {HomepageComponent} from "./component/homepage/homepage.component";
import {AnagraficaBaseComponent} from "./component/anagrafica-base/anagrafica-base.component";
import {AnagTestComponent} from "./component/anag-test/anag-test.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', component: HomepageComponent, canActivate: [AuthPolicyGuard]},
  {path: 'anagraficabase', component: AnagTestComponent, canActivate: [AuthPolicyGuard]},
  {path: 'anagraficabase/anagPage', component: AnagraficaBaseComponent, canActivate: [AuthPolicyGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
