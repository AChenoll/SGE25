import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteUnidadCentroComponent } from './delete-unidad-centro.component';


const routes: Routes=[{path:'', component: DeleteUnidadCentroComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteUnidadCentroRoutingModule { }
