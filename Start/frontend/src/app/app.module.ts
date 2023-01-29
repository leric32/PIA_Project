import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistartionComponent } from './registartion/registartion.component';
import { UcesnikComponent } from './ucesnik/ucesnik.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { AdminComponent } from './admin/admin.component';
import { RegistartionAdminComponent } from './registartion-admin/registartion-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistartionComponent,
    UcesnikComponent,
    OrganizatorComponent,
    AdminComponent,
    RegistartionAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
