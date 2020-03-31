import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LembreteRoutingModule } from './lembrete-routing.module';
import { LembreteComponent } from './lembrete.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CriarLembreteComponent } from './criar-lembrete/criar-lembrete.component';
import { CoreModule } from 'src/app/core/core.module';
import { ExcluirLembreteComponent } from './excluir-lembrete/excluir-lembrete.component';
import { AvisoLembreteComponent } from './aviso-lembrete/aviso-lembrete.component';


@NgModule({
  declarations: [LembreteComponent, CriarLembreteComponent, ExcluirLembreteComponent, AvisoLembreteComponent],
  imports: [
    CommonModule,
    LembreteRoutingModule,
    AppMaterialModule,
    CoreModule
  ]
})
export class LembreteModule { }
