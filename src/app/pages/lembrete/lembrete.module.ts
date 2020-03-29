import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LembreteRoutingModule } from './lembrete-routing.module';
import { LembreteComponent } from './lembrete.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CriarLembreteComponent } from './criar-lembrete/criar-lembrete.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [LembreteComponent, CriarLembreteComponent],
  imports: [
    CommonModule,
    LembreteRoutingModule,
    AppMaterialModule,
    CoreModule
  ]
})
export class LembreteModule { }
