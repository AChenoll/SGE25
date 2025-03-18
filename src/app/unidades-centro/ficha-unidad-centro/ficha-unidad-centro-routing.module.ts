import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaUnidadCentroComponent } from './ficha-unidad-centro.component';

const routes: Routes = [
  {
    path: '',
    component: FichaUnidadCentroComponent,
    redirectTo: 'ficha-unidad-centro'
},
{
    path: 'datos-unidad-centro',
    loadChildren: () => import('./datos-unidad-centro/datos-unidad-centro.module').then(m => m.DatosUnidadCentroModule),
    outlet: 'sidebar'
},
{
    path: 'datos-alumnos',
    loadChildren: () => import('./datos-alumnos/datos-alumnos.module').then(m => m.DatosAlumnosModule),
    outlet: 'sidebar'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaUnidadCentroRoutingModule { }
