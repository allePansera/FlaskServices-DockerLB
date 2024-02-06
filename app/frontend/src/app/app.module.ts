// Angular Moduls
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
// Components
import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AnagraficaBaseComponent} from './anagrafica-base/anagrafica-base.component';
import {SearchbarComponent} from './searchbar/searchbar.component';
// External Moduls
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HomepageComponent} from './homepage/homepage.component';
import { AnagTestComponent } from './anag-test/anag-test.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AnagraficaBaseComponent,
    SearchbarComponent,
    HomepageComponent,
    AnagTestComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
