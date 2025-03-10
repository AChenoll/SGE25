import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-unidad-centro',
  templateUrl: './edit-unidad-centro.component.html',
  styleUrls: ['./edit-unidad-centro.component.scss']
})
export class EditUnidadCentroComponent implements OnInit {
  editUnidadCentro: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUnidadCentroComponent>,
    private unidadesCentroService: UnidadesCentroService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadesCentro
  ) { }

  ngOnInit(): void {
    this.editUnidadCentro=new FormGroup({
      id_unidad_centro: new FormControl(this.unidadCentro.id_unidad_centro, [Validators.required]),
      unidad_centro: new FormControl(this.unidadCentro.unidad_centro, [Validators.required]),
      id_ciclo: new FormControl(this.unidadCentro.id_ciclo, [Validators.required]),
      observaciones: new FormControl(this.unidadCentro.observaciones)
    });

  }

  async confirmEdit(){
    if(this.editUnidadCentro.valid){
      const unidadCentro=this.editUnidadCentro.value;

      const RESP  = await this.unidadesCentroService.editUnidadCentro(unidadCentro).toPromise();
      if(RESP.ok){
        this.snackBar.open(RESP.message, CLOSE, {duration:5000});
        this.dialogRef.close({ok:RESP.ok, data: RESP.data});
      } else {
        this.snackBar.open(RESP.message, CLOSE, {duration:5000})
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, {duration: 5000})
    }
  }

  onNoClick(): void{
    this.dialogRef.close({ok: false});
  }

}
