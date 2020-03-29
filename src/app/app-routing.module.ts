import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './pages/login/login.module#LoginModule'},
  {path: 'lembrete', loadChildren: './pages/lembrete/lembrete.module#LembreteModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
