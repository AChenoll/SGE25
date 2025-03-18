import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaUnidadCentroRoutingModule } from './ficha-unidad-centro-routing.module';
import { FichaUnidadCentroComponent } from './ficha-unidad-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';



@NgModule({
  declarations: [FichaUnidadCentroComponent],
  imports: [
    CommonModule,
    FichaUnidadCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class FichaUnidadCentroModule { }
