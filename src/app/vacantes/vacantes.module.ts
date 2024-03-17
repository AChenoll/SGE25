import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { VacantesRoutingModule } from './vacantes-routing.module';
import { InfoVacantesComponent } from './info-vacantes/info-vacantes.component';
import { EditVacanteComponent } from './edit-vacante/edit-vacante.component';
import { DeleteVacanteComponent } from './delete-vacante/delete-vacante.component';
import { AddVacanteComponent } from './add-vacante/add-vacante.component';
import { VacantesComponent } from './vacantes.component';



@NgModule({
  declarations: [InfoVacantesComponent, EditVacanteComponent, DeleteVacanteComponent, AddVacanteComponent, VacantesComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    CrudMaterialModule,
    VacantesRoutingModule
  ]
})
export class VacantesModule { }
