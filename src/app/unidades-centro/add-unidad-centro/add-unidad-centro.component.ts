import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-unidad-centro',
  templateUrl: './add-unidad-centro.component.html',
  styleUrls: ['./add-unidad-centro.component.scss']
})
export class AddUnidadCentroComponent implements OnInit {

  addUnidadCentroForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUnidadCentroComponent>,
    private snackBar: MatSnackBar,
    private unidadesCentroService: UnidadesCentroService
  ) { }

  ngOnInit(): void {
    this.addUnidadCentroForm = new FormGroup({
      unidad_centro: new FormControl(null, Validators.required),
      id_ciclo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
  }

  async confirmAdd() {
    if (this.addUnidadCentroForm.valid) {
      const unidadCentro = this.addUnidadCentroForm.value as UnidadesCentro;

      const RESPONSE = await this.unidadesCentroService.addUnidadCentro(unidadCentro).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}
