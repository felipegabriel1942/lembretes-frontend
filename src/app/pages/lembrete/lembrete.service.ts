import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lembrete } from 'src/app/shared/models/lembrete';
import { AppKeys } from 'src/app/core/keys/app-keys';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor(private http: HttpClient) {}

  salvarLembrete(lembrete: Lembrete) {
    return this.http.post<Lembrete>(AppKeys.apiUrl + `lembrete`, lembrete);
  }

  listarLembretes(pagina: number, qtdRegistros: number, pkUsuario: number) {
    return this.http.get(AppKeys.apiUrl + `lembrete/listar-lembretes?pagina=${pagina}&qtdRegistros=${qtdRegistros}&pkUsuario=${pkUsuario}`);
  }
}
