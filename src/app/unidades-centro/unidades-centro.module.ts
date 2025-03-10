import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesCentroRoutingModule } from './unidades-centro-routing.module';
import { UnidadesCentroComponent } from './unidades-centro.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddUnidadCentroComponent } from './add-unidad-centro/add-unidad-centro.component';
import { EditUnidadCentroComponent } from './edit-unidad-centro/edit-unidad-centro.component';
import { DeleteUnidadCentroComponent } from './delete-unidad-centro/delete-unidad-centro.component';


@NgModule({
  declarations: [UnidadesCentroComponent, AddUnidadCentroComponent, EditUnidadCentroComponent, DeleteUnidadCentroComponent],
  imports: [
    CommonModule,
    UnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class UnidadesCentroModule { }
