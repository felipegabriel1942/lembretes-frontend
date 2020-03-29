import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { CredenciaisDTO } from 'src/app/core/security/credenciais.dto';
import { AuthenticationService } from 'src/app/core/security/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {

  }


  login() {
    const credenciais = new CredenciaisDTO();
    credenciais.email = 'pinheiro_felipeg@yahoo.com.br';
    credenciais.senha = '123';
    this.authenticationService.autenticarLogin(credenciais).subscribe(
      retorno => {
        sessionStorage.setItem('token', retorno.headers.get('Authorization'));
      }
    );
  }
}
