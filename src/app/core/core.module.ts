import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './security/authentication.service';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  declarations: []
})
export class CoreModule {

}
