import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'intranet',
    loadChildren: () => import('./modules/prospecto/prospecto.module').then(m => m.ProspectoModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule),
  },
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
