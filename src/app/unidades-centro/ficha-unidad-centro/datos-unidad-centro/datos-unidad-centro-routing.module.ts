import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosUnidadCentroComponent } from './datos-unidad-centro.component';

const routes: Routes = [
  {
    path: '',
    component: DatosUnidadCentroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosUnidadCentroRoutingModule { }
