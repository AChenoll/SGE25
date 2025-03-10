import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-unidad-centro',
  templateUrl: './delete-unidad-centro.component.html',
  styleUrls: ['./delete-unidad-centro.component.scss']
})
export class DeleteUnidadCentroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUnidadCentroComponent>,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadesCentro,
    public unidadesCentroService: UnidadesCentroService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }

  async confirmDelete() {
    const RESPONSE = await this.unidadesCentroService.deleteUnidadCentro(this.unidadCentro).toPromise();
    if(RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});
      this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
    } else {
      this.snackBar.open(RESPONSE.message, CLOSE, {duration:5000});
    }
  }

}
