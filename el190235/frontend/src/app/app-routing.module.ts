import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { RegistartionAdminComponent } from './registartion-admin/registartion-admin.component';
import { RegistartionComponent } from './registartion/registartion.component';
import { UcesnikComponent } from './ucesnik/ucesnik.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login_admin", component:LoginAdminComponent},
  {path:"register", component:RegistartionComponent},
  {path:"register_admin", component:RegistartionAdminComponent},
  {path:"admin", component:AdminComponent},
  {path:"organizator", component:OrganizatorComponent},
  {path:"ucesnik", component:UcesnikComponent},
  {path:"reset_password/:str", component:ResetPasswordComponent},
  {path:"workshop_details", component:WorkshopDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
