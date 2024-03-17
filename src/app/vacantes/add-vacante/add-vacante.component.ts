import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CLOSE, INVALID_FORM } from "../../shared/messages";
import { EntidadesService } from "src/app/services/entidades.service";
import { Entidad } from "src/app/shared/interfaces/entidad";
import { VacantesService } from "src/app/services/vacantes.service";
import { UnidadesCentroService } from "src/app/services/unidades-centro.service";
import { UnidadCentro } from "src/app/shared/interfaces/unidad-centro";

@Component({
  selector: "app-add-vacante",
  templateUrl: "./add-vacante.component.html",
  styleUrls: ["./add-vacante.component.scss"],
})
export class AddVacanteComponent implements OnInit {
  vacanteForm: FormGroup;
  entidades: Entidad[];
  unidadesCentro: UnidadCentro[];

  constructor(
    private vacanteService: VacantesService,
    private entidadService: EntidadesService,
    private unidadCentroService: UnidadesCentroService,
    public dialogRef: MatDialogRef<AddVacanteComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(0),
      id_entidad: new FormControl(null, Validators.required),
      id_unidad_centro: new FormControl(null, Validators.required),
      num_alumnos: new FormControl(null, Validators.required),
    });
    this.getEntidades();
    this.getUnidades();
  }

  async getEntidades() {
    const RESP = await this.entidadService.get().toPromise();
    if (RESP.ok) {
      this.entidades = RESP.data as Entidad[];
    }
  }

  async getUnidades() {
    const RESP = await this.unidadCentroService.get().toPromise();
    if (RESP.ok) {
      this.unidadesCentro = RESP.data as UnidadCentro[];
    }
  }

  async confirmAdd() {
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value;

      const RESP = await this.vacanteService.addVacante(vacante).toPromise();
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

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
