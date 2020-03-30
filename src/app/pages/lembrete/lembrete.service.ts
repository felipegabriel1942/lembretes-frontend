import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lembrete } from 'src/app/shared/models/lembrete';
import { AppKeys } from 'src/app/core/keys/app-keys';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  confirmarExclusao = new EventEmitter();
  cancelarExclusao = new EventEmitter();
  edicaoLembrete = new BehaviorSubject(new Lembrete());

  constructor(private http: HttpClient) {}

  salvarLembrete(lembrete: Lembrete) {
    return this.http.post<Lembrete>(AppKeys.apiUrl + `lembrete`, lembrete);
  }

  listarLembretes(pagina: number, qtdRegistros: number, pkUsuario: number) {
    return this.http.get(AppKeys.apiUrl + `lembrete/listar-lembretes?pagina=${pagina}&qtdRegistros=${qtdRegistros}&pkUsuario=${pkUsuario}`);
  }

  excluirLembrete(pkLembrete: number) {
    return this.http.delete(AppKeys.apiUrl + `lembrete?pkLembrete=${pkLembrete}`);
  }
}
