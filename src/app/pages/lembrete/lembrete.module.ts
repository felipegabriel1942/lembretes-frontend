import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LembreteRoutingModule } from './lembrete-routing.module';
import { LembreteComponent } from './lembrete.component';


@NgModule({
  declarations: [LembreteComponent],
  imports: [
    CommonModule,
    LembreteRoutingModule
  ]
})
export class LembreteModule { }
