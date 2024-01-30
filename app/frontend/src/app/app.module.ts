// Angular Moduls
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
// import {RouterModule} from "@angular/router";

// Components
import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AnagraficaBaseComponent} from './anagrafica-base/anagrafica-base.component';
import {SearchbarComponent} from './searchbar/searchbar.component';

// External Moduls
// sweetalert
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

// ag grid
import {AgGridModule} from 'ag-grid-angular';

import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {HomepageComponent} from './homepage/homepage.component';
import { AnagTestComponent } from './anag-test/anag-test.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AnagraficaBaseComponent,
    SearchbarComponent,
    HomepageComponent,
    AnagTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /*RouterModule.forRoot([
      {path: 'homePage', component: HomepageComponent},
      {path: 'anagraficabase/:urlPage', component: AnagraficaBaseComponent}
    ]),*/
    AgGridModule,
    SweetAlert2Module,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
