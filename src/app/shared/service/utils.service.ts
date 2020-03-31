import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  resetarCampoForm(formulario: FormGroup, campo: string) {
    formulario.get(campo).setValue('');
    formulario.get(campo).markAsUntouched();
  }
}
