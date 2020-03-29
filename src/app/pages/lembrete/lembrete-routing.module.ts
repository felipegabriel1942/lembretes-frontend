import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LembreteComponent } from './lembrete.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { CriarLembreteComponent } from './criar-lembrete/criar-lembrete.component';


const routes: Routes = [
  {path: '', component: LembreteComponent, canActivate: [AuthGuard]},
  {path: 'criar-lembrete', component: CriarLembreteComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LembreteRoutingModule { }
