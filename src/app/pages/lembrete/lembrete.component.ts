import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { CriarLembreteComponent } from './criar-lembrete/criar-lembrete.component';
import { Usuario } from 'src/app/shared/models/usuario';
import { Lembrete } from 'src/app/shared/models/lembrete';
import { LembreteService } from './lembrete.service';

@Component({
  selector: 'app-lembrete',
  templateUrl: './lembrete.component.html',
  styleUrls: ['./lembrete.component.css']
})
export class LembreteComponent implements OnInit, AfterViewInit {

  usuario = new Usuario();
  lembretes = new Array<Lembrete>();
  dataSource = new MatTableDataSource<Lembrete>(this.lembretes);
  displayedColumns: string[] = ['titulo',  'texto', 'dataLembrete', 'editar', 'excluir'];
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private loginService: LoginService,
              private lembreteService: LembreteService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsuarioLogado();
  }

  getUsuarioLogado() {
    this.loginService.buscarUsuarioPorPk(+sessionStorage.getItem('usuario')).subscribe(
      usuario => {
        this.usuario = usuario;
        this.getLembretes();
      }
    );
  }

  getLembretes() {
    this.lembreteService.listarLembretes(this.paginator.pageIndex, 10, this.usuario.pkUsuario).subscribe(
      (retorno: any) => {
        this.dataSource = new MatTableDataSource(retorno.content);
        this.resultsLength = retorno.totalElements;
      }
    );
  }

  abrirCadastro() {
    const dialogRef = this.dialog.open(CriarLembreteComponent, {
      width: '350px',
      height: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLembretes();
    });
  }


  atualizarPaginaTabela() {
    this.getLembretes();
  }
}
