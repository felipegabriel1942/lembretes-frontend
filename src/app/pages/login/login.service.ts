import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/shared/models/usuario';
import { AppKeys } from 'src/app/core/keys/app-keys';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  buscarUsuarioPorEmail(email: string) {
    return this.http.get<Usuario>(AppKeys.apiUrl + `usuario/buscar-usuario-email?email=${email}`);
  }

  buscarUsuarioPorPk(pkUsuario: number) {
    return this.http.get<Usuario>(AppKeys.apiUrl + `usuario/buscar-usuario-pk?pkUsuario=${pkUsuario}`);
  }

  salvarUsuario(usuario: Usuario) {
    return this.http.post(AppKeys.apiUrl + `cadastro-usuario`, usuario);
  }
}
