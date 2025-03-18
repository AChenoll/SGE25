import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';
import { LinkedinUrlValidator } from 'src/app/shared/validators/linkedinUrlValidator';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss']
})
export class EditAlumnoComponent implements OnInit {

  alumno: Alumno;
  alumnoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoComponent>,
    private snackBar: MatSnackBar,
    private alumnoService: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) { this.alumno = { ...data } }

  ngOnInit() {
    this.alumnoForm = new FormGroup({
      id: new FormControl(this.alumno.id),
      nombre: new FormControl(this.alumno.nombre, Validators.required),
      apellidos: new FormControl(this.alumno.apellidos, Validators.required),
      fecha_nacimiento: new FormControl(this.alumno.fecha_nacimiento, Validators.required),
      linkedin: new FormControl(this.alumno.linkedin, [Validators.required, LinkedinUrlValidator()]),
      nivel_ingles: new FormControl(this.alumno.nivel_ingles, Validators.required),
      minusvalia: new FormControl(this.alumno.minusvalia, Validators.required),
      otra_formacion: new FormControl(this.alumno.otra_formacion),
      centro_actual: new FormControl(this.alumno.centro_actual, Validators.required)
    });
  }

  async confirmEdit() {
    if (this.alumnoForm.valid) {
      const alumno = this.alumnoForm.value;

      try {
        const RESP = await this.alumnoService.editAlumno(alumno).toPromise();

        if (RESP.ok) {
          this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
        } else {
          this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        }
      } catch (error) {
        console.error('Error al editar alumno:', error);
        this.snackBar.open('Error al editar alumno', CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}
