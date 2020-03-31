import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login/login.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { CriarLembreteComponent } from './criar-lembrete/criar-lembrete.component';
import { Usuario } from 'src/app/shared/models/usuario';
import { Lembrete } from 'src/app/shared/models/lembrete';
import { LembreteService } from './lembrete.service';
import { Router } from '@angular/router';
import { ExcluirLembreteComponent } from './excluir-lembrete/excluir-lembrete.component';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-lembrete',
  templateUrl: './lembrete.component.html',
  styleUrls: ['./lembrete.component.css']
})
export class LembreteComponent implements OnInit, AfterViewInit, OnDestroy {

  usuario = new Usuario();
  lembretes = new Array<Lembrete>();
  lembrete = new Lembrete();
  dataSource = new MatTableDataSource<Lembrete>(this.lembretes);
  displayedColumns: string[] = ['titulo',  'texto', 'dataLembrete', 'editar', 'excluir'];
  resultsLength = 0;
  dialogExclusao;
  subscriptionList = new Array<Subscription>();
  mobile = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private loginService: LoginService,
              private lembreteService: LembreteService,
              private router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.mobile = this.deviceService.isMobile() || this.deviceService.isTablet();
    this.excluir();
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

  excluir() {
    this.subscriptionList.push(this.lembreteService.cancelarExclusao.subscribe(
      () => {
        this.dialogExclusao.close();
        this.dialogExclusao.afterClosed().subscribe(result => {
          this.getLembretes();
        });
      }
    ));

    this.subscriptionList.push(this.lembreteService.confirmarExclusao.subscribe(
      () => {
        this.dialogExclusao.close();
        this.dialogExclusao.afterClosed().subscribe(result => {
          this.lembreteService.excluirLembrete(this.lembrete.pkLembrete).subscribe(
            () => {
              this.snackBar.open('Lembrete excluído com sucesso!', 'Fechar', {
                duration: 5000
              });
              this.getLembretes();
            }
          );
        });
      }
    ));
  }

  confimacaoExclusao(lembrete: Lembrete) {
    this.lembrete = lembrete;
    this.dialogExclusao = this.dialog.open(ExcluirLembreteComponent, {
      width: '350px',
      height: '130px'
    });
  }

  editar(lembrete: Lembrete) {
    this.lembreteService.edicaoLembrete.next(lembrete);
    const dialogRef = this.dialog.open(CriarLembreteComponent, {
      width: '350px',
      height: '360px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLembretes();
    });
  }

  aplicarFiltro(evento: Event) {
    const filtrarValor = (evento.target as HTMLInputElement).value;
    this.lembreteService.listarLembretesPorTitulo(this.paginator.pageIndex, 10, filtrarValor, this.usuario.pkUsuario).subscribe(
      (retorno: any) => {
        console.log(retorno);
        this.dataSource = new MatTableDataSource(retorno.content);
        this.resultsLength = retorno.totalElements;
      }
    );
  }

  abrirCadastro() {
    const dialogRef = this.dialog.open(CriarLembreteComponent, {
      width: '350px',
      height: '360px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLembretes();
    });
  }

  atualizarPaginaTabela() {
    this.getLembretes();
  }

  deslogarSistema() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  ngOnDestroy() {
    this.subscriptionList.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
