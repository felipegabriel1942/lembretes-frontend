import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { CredenciaisDTO } from 'src/app/core/security/credenciais.dto';
import { AuthenticationService } from 'src/app/core/security/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private loginService: LoginService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.formBuilder();
  }

  formBuilder() {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  login() {
    const credenciais = new CredenciaisDTO();
    credenciais.email = this.formLogin.get('email').value;
    credenciais.senha = this.formLogin.get('senha').value;
    this.authenticationService.autenticarLogin(credenciais).subscribe(
      retorno => {
        sessionStorage.setItem('token', retorno.headers.get('Authorization'));
        this.router.navigateByUrl('/lembrete');
      }
    );
  }
}
