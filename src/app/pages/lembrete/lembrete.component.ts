import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { MatDialog } from '@angular/material';
import { CriarLembreteComponent } from './criar-lembrete/criar-lembrete.component';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-lembrete',
  templateUrl: './lembrete.component.html',
  styleUrls: ['./lembrete.component.css']
})
export class LembreteComponent implements OnInit {

  usuario = new Usuario();

  constructor(private loginService: LoginService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsuarioLogado();
  }

  getUsuarioLogado() {
    this.loginService.buscarUsuarioPorPk(+sessionStorage.getItem('usuario')).subscribe(
      usuario => {
        this.usuario = usuario;
      }
    );
  }

  abrirCadastro() {
    const dialogRef = this.dialog.open(CriarLembreteComponent, {
      width: '350px',
      height: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
