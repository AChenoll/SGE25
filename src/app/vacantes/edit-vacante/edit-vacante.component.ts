import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CLOSE, INVALID_FORM } from "../../shared/messages";
import { UnidadesCentroService } from "src/app/services/unidades-centro.service";
import { EntidadesService } from "src/app/services/entidades.service";
import { Entidad } from "src/app/shared/interfaces/entidad";
import { Alumno } from "src/app/shared/interfaces/alumno";
import { UnidadCentro } from "src/app/shared/interfaces/unidad-centro";
import { VacantesService } from "src/app/services/vacantes.service";
import { Vacantes } from "src/app/shared/interfaces/vacantes";

@Component({
  selector: "app-edit-vacante",
  templateUrl: "./edit-vacante.component.html",
  styleUrls: ["./edit-vacante.component.scss"],
})
export class EditVacanteComponent implements OnInit {
  entidades: Entidad[];
  unidades: UnidadCentro[];
  vacanteForm: FormGroup;

  alumnosTotales: Alumno[];
  alumnosSeleccionados: Alumno[];
  alumnosSeleccionadosControl = new FormControl();
  alumnoSeleccionado: string;

  constructor(
    private vacantesService: VacantesService,
    private entidadesService: EntidadesService,
    private unidadCentroService: UnidadesCentroService,
    public dialogRef: MatDialogRef<EditVacanteComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacantes
  ) {
    this.alumnosTotales = [];
    this.alumnosSeleccionados = [];
  }

  ngOnInit(): void {
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(this.vacante.id_vacante),
      id_entidad: new FormControl(this.vacante.id_entidad, Validators.required),
      id_unidad_centro: new FormControl(this.vacante.id_unidad_centro, Validators.required),
      num_alumnos: new FormControl(this.vacante.num_alumnos, Validators.required)
    });

    this.getEntidades();
    this.getUnidadesCentro();
    this.getAlumnado();
  }

  asignarAlumno(alumnoSeleccionado: string) {
    const alumno = this.alumnosTotales.find(
      (alumno) => alumno.nombre + " " + alumno.apellidos === alumnoSeleccionado
    );

    if (alumno) {
      this.alumnosTotales = this.alumnosTotales.filter(
        (alumno) => alumno !== alumno
      );
      this.alumnosSeleccionados.push(alumno);
    }
    this.alumnosSeleccionadosControl.setValue("");
  }

  quitarAlumno(alumnoSeleccionado: Alumno) {
    const index = this.alumnosSeleccionados.indexOf(alumnoSeleccionado);
    if (index !== -1) {
      this.alumnosSeleccionados.splice(index, 1);
      this.alumnosTotales.push(alumnoSeleccionado);
    }
  }

  comprobarMinimo(cantidad: number) {
    if (cantidad < this.alumnosSeleccionados.length) {
      this.vacanteForm.get("num_alumnos").setValue(this.alumnosSeleccionados.length);
    }
  }

  async confirmEdit() {
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value;
      const idsAlumnos: number[] = this.alumnosSeleccionados.map((alumno) => {
        return Number(alumno.id);
      });
      const RESP = await this.vacantesService.editVacante(vacante).toPromise();
      if (RESP.ok) {
        const RESP2 = await this.vacantesService
          .addAlumnosSeleccionados(vacante.id_vacante, idsAlumnos)
          .toPromise();
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  async getAlumnado() {
    const RESP = await this.vacantesService
      .getAlumnado(this.vacante.id_vacante, this.vacante.id_unidad_centro)
      .toPromise();
    if (RESP.ok) {
      RESP.data.forEach((alumno) => {
        if (alumno["estado"] == "asignado") {
          this.alumnosSeleccionados.push(alumno);
        } else {
          this.alumnosTotales.push(alumno);
        }
      });
    }
  }

  async getEntidades() {
    const RESP = await this.entidadesService.get().toPromise();
    if (RESP.ok) {
      this.entidades = RESP.data as Entidad[];
    }
  }

  async getUnidadesCentro() {
    const RESP = await this.unidadCentroService.get().toPromise();
    if (RESP.ok) {
      this.unidades = RESP.data as UnidadCentro[];
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
