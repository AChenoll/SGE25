import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CLOSE } from "../../shared/messages";
import { VacantesService } from "src/app/services/vacantes.service";
import { Vacantes } from "src/app/shared/interfaces/vacantes";

@Component({
  selector: "app-delete-vacante",
  templateUrl: "./delete-vacante.component.html",
  styleUrls: ["./delete-vacante.component.scss"],
})
export class DeleteVacanteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public vacante: Vacantes,
    private vacantesService: VacantesService,
    public dialogRef: MatDialogRef<DeleteVacanteComponent>,
    private snackBar: MatSnackBar
  ) { }

  async deleteVacante() {
    const RESP = await this.vacantesService.deleteVacante(this.vacante.id_vacante).toPromise();
    if (RESP.ok) {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
    } else {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
