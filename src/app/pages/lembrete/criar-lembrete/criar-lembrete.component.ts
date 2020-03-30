import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lembrete } from 'src/app/shared/models/lembrete';
import { MatDialogRef, ThemePalette, ProgressSpinnerMode, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Usuario } from 'src/app/shared/models/usuario';
import { LoginService } from '../../login/login.service';
import { LembreteService } from '../lembrete.service';
import { LembreteComponent } from '../lembrete.component';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-criar-lembrete',
  templateUrl: './criar-lembrete.component.html',
  styleUrls: ['./criar-lembrete.component.css']
})
export class CriarLembreteComponent implements OnInit, OnDestroy {

  formLembrete: FormGroup;
  usuario = new Usuario();
  lembrete = new Lembrete();
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  carregando = false;
  lembreteEdicaoSubscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<CriarLembreteComponent>,
              private snackBar: MatSnackBar,
              private loginService: LoginService,
              private lembreteService: LembreteService) { }

  ngOnInit() {
    this.formBuilder();
    this.getUsuarioLogado();
    this.getLembreteEdicao();
  }

  formBuilder() {
    this.formLembrete = new FormGroup({
      titulo: new FormControl('', Validators.required),
      texto: new FormControl('', Validators.required),
      dataLembrete: new FormControl(new Date(), Validators.required)
    });
  }

  getUsuarioLogado() {
    this.loginService.buscarUsuarioPorPk(+sessionStorage.getItem('usuario')).subscribe(
      usuario => {
        this.usuario = usuario;
      }
    );
  }

  salvar() {
    if (this.formLembrete.valid) {
      this.carregando = true;
      this.lembrete.titulo = this.formLembrete.get('titulo').value;
      this.lembrete.texto = this.formLembrete.get('texto').value;
      this.lembrete.dataLembrete = this.formLembrete.get('dataLembrete').value;
      this.lembrete.fkUsuario = this.usuario;
      this.lembreteService.salvarLembrete(this.lembrete).subscribe(retorno => {
        this.carregando = false;
        this.dialogRef.close();
        this.snackBar.open('Lembrete salvo com sucesso!', 'Fechar', {
          duration: 5000
        });
      }, erro => {
        this.carregando = false;
      });
    }
  }

  getLembreteEdicao() {
    this.lembreteEdicaoSubscription = this.lembreteService.edicaoLembrete.subscribe(
      (lembrete: Lembrete) => {
        this.lembrete = lembrete;
        this.formLembrete.get('titulo').setValue(this.lembrete.titulo);
        this.formLembrete.get('texto').setValue(this.lembrete.texto);
        this.formLembrete.get('dataLembrete').setValue(new Date(this.lembrete.dataLembrete));
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.lembreteEdicaoSubscription.unsubscribe();
  }

}
