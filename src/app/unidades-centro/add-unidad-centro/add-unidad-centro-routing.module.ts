import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUnidadCentroComponent } from './add-unidad-centro.component';

const routes: Routes=[{path:'', component: AddUnidadCentroComponent}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUnidadCentroRoutingModule { }
