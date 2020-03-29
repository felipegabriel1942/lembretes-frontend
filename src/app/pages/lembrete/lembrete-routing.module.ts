import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LembreteComponent } from './lembrete.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';


const routes: Routes = [
  {path: '', component: LembreteComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LembreteRoutingModule { }
