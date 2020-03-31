import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public getErrorMessage(formulario: FormGroup, campo: string) {
    if (formulario.get(campo).hasError('required')) {
      return 'Campo obrigatório.';
    }

    if (formulario.get(campo).hasError('matDatepickerParse')) {
      return 'Data inválida.';
    }

    if (formulario.get(campo).hasError('email')) {
      return 'Email inválido.';
    }
  }
}
