import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { LembreteService } from '../lembrete.service';
import { ThemePalette, ProgressSpinnerMode, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-aviso-lembrete',
  templateUrl: './aviso-lembrete.component.html',
  styleUrls: ['./aviso-lembrete.component.css']
})
export class AvisoLembreteComponent implements OnInit {

  usuario = new Usuario();
  quantidadeLembretes = 0;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  carregando = false;

  constructor(private loginService: LoginService,
              private lembreteService: LembreteService,
              private dialogRef: MatDialogRef<AvisoLembreteComponent>) { }

  ngOnInit() {
    this.getUsuarioLogado();
  }

  getUsuarioLogado() {
    this.carregando = true;
    this.loginService.buscarUsuarioPorPk(+sessionStorage.getItem('usuario')).subscribe(
      usuario => {
        this.usuario = usuario;
        this.lembreteService.contarLembretesUsuario(this.usuario.pkUsuario).subscribe(
          (quantidade: number) => {
            this.quantidadeLembretes = quantidade;
            this.carregando = false;
          }, error => {
            this.carregando = false;
          }
        );
      }
    );
  }

  confirmar() {
    this.dialogRef.close();
  }
}
