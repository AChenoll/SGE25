import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';
import { LinkedinUrlValidator } from 'src/app/shared/validators/linkedinUrlValidator';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {

  alumnoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public centro_actual: number,
    public dialogRef: MatDialogRef<AddAlumnoComponent>,
    private snackBar: MatSnackBar,
    private alumnoService: AlumnoService,
  ) {}

  ngOnInit() {
    this.alumnoForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      fecha_nacimiento: new FormControl(null, Validators.required),
      linkedin: new FormControl(null, [Validators.required, LinkedinUrlValidator()]),
      nivel_ingles: new FormControl(null, Validators.required),
      minusvalia: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      otra_formacion: new FormControl(null),
      centro_actual: new FormControl(this.centro_actual)
    });
  }

  async confirmAdd() {
    if (this.alumnoForm.valid) {
      const alumno = this.alumnoForm.value as Alumno;
      const RESP = await this.alumnoService.addAlumno(alumno).toPromise();

      if (RESP.ok) {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}
