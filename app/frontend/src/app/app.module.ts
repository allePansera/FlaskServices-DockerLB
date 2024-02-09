// Angular Moduls
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
// Components
import {AppComponent} from './app.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {AnagraficaBaseComponent} from './component/anagrafica-base-NOTUSED/anagrafica-base.component';
import {SearchbarComponent} from './component/searchbar/searchbar.component';
// External Moduls
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HomepageComponent} from './component/homepage/homepage.component';
import { UserRegistryComponent } from './component/user-registry/user-registry.component';
import { LoginComponent } from './component/login/login.component';
import { FilterSectionComponent } from './component/composable/filter-section/filter-section.component';
import { DatatableSectionComponent } from './component/composable/datatable-section/datatable-section.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AnagraficaBaseComponent,
    SearchbarComponent,
    HomepageComponent,
    UserRegistryComponent,
    LoginComponent,
    FilterSectionComponent,
    DatatableSectionComponent
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
