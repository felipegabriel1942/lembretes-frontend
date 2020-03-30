import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette, ProgressSpinnerMode, MatDialogRef, MatSnackBar } from '@angular/material';
import { Usuario } from 'src/app/shared/models/usuario';
import { LoginService } from '../login.service';
import { ErrorService } from 'src/app/shared/service/error.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  formUsuario: FormGroup;
  carregando = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private dialogRef: MatDialogRef<CadastroUsuarioComponent>,
              private loginService: LoginService,
              private snackBar: MatSnackBar,
              public errorService: ErrorService) { }

  ngOnInit() {
    this.formUsuarioBuilder();
  }

  formUsuarioBuilder() {
    this.formUsuario = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    });
  }

  salvar() {
    if (this.formUsuario.valid) {
      this.carregando = true;
      const novoUsuario = new Usuario();
      novoUsuario.nome = this.formUsuario.get('nome').value;
      novoUsuario.email = this.formUsuario.get('email').value;
      novoUsuario.senha = this.formUsuario.get('senha').value;
      this.loginService.salvarUsuario(novoUsuario).subscribe(() => {
        this.carregando = false;
        this.dialogRef.close();
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
          duration: 5000
        });
      }, erro => {
        this.carregando = false;
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
