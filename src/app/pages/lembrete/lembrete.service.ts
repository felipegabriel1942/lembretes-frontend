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
}
