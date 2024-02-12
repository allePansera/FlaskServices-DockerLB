// Angular Moduls
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
// Components
import {AppComponent} from './app.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {SearchbarComponent} from './component/searchbar/searchbar.component';
import {HomepageComponent} from './component/homepage/homepage.component';
import { UserRegistryComponent } from './component/user-registry/user-registry.component';
import { LoginComponent } from './component/login/login.component';
import { DatatableSectionComponent } from './component/composable/datatable-section/datatable-section.component';
import { ProductRegistryComponent } from './component/product-registry/product-registry/product-registry.component';
import { CategoryRegistryComponent} from './component/category-registry/category-registry/category-registry.component';
// External Moduls
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SearchbarComponent,
    HomepageComponent,
    UserRegistryComponent,
    LoginComponent,
    ProductRegistryComponent,
    CategoryRegistryComponent,
    DatatableSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
