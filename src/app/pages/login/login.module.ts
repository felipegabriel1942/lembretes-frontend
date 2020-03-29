import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AppMaterialModule,
    CoreModule
  ]
})
export class LoginModule { }
