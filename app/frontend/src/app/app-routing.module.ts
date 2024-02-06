import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AnagraficaBaseComponent} from "./anagrafica-base/anagrafica-base.component";
import {AnagTestComponent} from "./anag-test/anag-test.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'anagraficabase', component: AnagTestComponent},
  {path: 'anagraficabase/anagPage', component: AnagraficaBaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
