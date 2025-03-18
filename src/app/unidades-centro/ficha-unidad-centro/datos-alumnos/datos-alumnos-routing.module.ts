import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosAlumnosComponent } from './datos-alumnos.component';

const routes: Routes = [
  {
    path: '',
    component: DatosAlumnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosAlumnosRoutingModule { }
