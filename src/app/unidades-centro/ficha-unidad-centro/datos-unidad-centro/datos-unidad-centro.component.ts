import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { FichaUnidadCentroComponent } from '../ficha-unidad-centro.component';

@Component({
  selector: 'app-datos-unidad-centro',
  templateUrl: './datos-unidad-centro.component.html',
  styleUrls: ['./datos-unidad-centro.component.scss']
})
export class DatosUnidadCentroComponent implements OnInit {

  ciclos: Ciclo[];
  unidadCentro: UnidadesCentro;
  datosUnidadesCentroForm: FormGroup;

  constructor(
    private ciclosService: CiclosService,
    public unidadesCentroService: UnidadesCentroService,
    private datosUnidadCentro: FichaUnidadCentroComponent,
  ) { this.unidadCentro = datosUnidadCentro.fichaUnidadCentro }

  ngOnInit(): void {
    this.setForm();
    this.getCiclos();
    this.datosUnidadesCentroForm.valueChanges.subscribe(form => {
      const ciclo = this.ciclos.find(ciclo => ciclo.id_ciclo === form.id_ciclo);
      form.ciclo = ciclo ? ciclo.ciclo : '';
      this.unidadesCentroService.setDatosUnidadCentro(form)
    })
  }

  setForm(): void {
    this.datosUnidadesCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadesCentroService.unidadesCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadesCentroService.unidadesCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadesCentroService.unidadesCentro.id_ciclo, Validators.required),
      ciclo: new FormControl(this.unidadesCentroService.unidadesCentro.ciclo, Validators.required),
      observaciones: new FormControl(this.unidadesCentroService.unidadesCentro.observaciones)
    })
  }

  async getCiclos() {
    const RESP = await this.ciclosService.getAllCiclos().toPromise();

    if (RESP.ok) {
      this.ciclos = RESP.data as Ciclo[];
    }
  }

}
