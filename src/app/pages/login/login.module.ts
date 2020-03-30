import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CoreModule } from 'src/app/core/core.module';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';


@NgModule({
  declarations: [LoginComponent, CadastroUsuarioComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AppMaterialModule,
    CoreModule
  ]
})
export class LoginModule { }
