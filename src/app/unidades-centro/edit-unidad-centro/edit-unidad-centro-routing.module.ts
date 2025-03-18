import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUnidadCentroComponent } from './edit-unidad-centro.component';

const routes: Routes=[{path:'', component: EditUnidadCentroComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUnidadCentroRoutingModule { }
