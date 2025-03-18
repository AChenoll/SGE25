import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosAlumnosRoutingModule } from './datos-alumnos-routing.module';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { DatosAlumnosComponent } from './datos-alumnos.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { EdadAlumnoPipe } from 'src/app/shared/pipe/edad-alumno.pipe';
import { LinkedinUrlPipe } from 'src/app/shared/pipe/linkedin-url.pipe';


@NgModule({
  declarations: [EditAlumnoComponent, DeleteAlumnoComponent, AddAlumnoComponent, DatosAlumnosComponent, EdadAlumnoPipe, LinkedinUrlPipe],
  imports: [
    CommonModule,
    DatosAlumnosRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosAlumnosModule { }
