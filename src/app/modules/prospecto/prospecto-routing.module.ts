import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/helpers';
import { FiltroBusquedaComponent } from './pages/filtro-busqueda/filtro-busqueda.component';
import { DetalleProspectoComponent } from './pages/detalle-prospecto/detalle-prospecto.component';

const routes: Routes = [
  {
    path: 'prospectos',
    component: FiltroBusquedaComponent,
    // canActivate: [AuthGuard]
  
  },
  {
    path: 'prospectos/:id/detalle',
    component: DetalleProspectoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProspectoRoutingModule { }
