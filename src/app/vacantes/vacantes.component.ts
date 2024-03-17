import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacantes } from '../shared/interfaces/vacantes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VacantesService } from '../services/vacantes.service';
import { Overlay } from '@angular/cdk/overlay';
import { AddVacanteComponent } from './add-vacante/add-vacante.component';
import { EditVacanteComponent } from './edit-vacante/edit-vacante.component';
import { DeleteVacanteComponent } from './delete-vacante/delete-vacante.component';
import { InfoVacantesComponent } from './info-vacantes/info-vacantes.component';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss']
})
export class VacantesComponent implements OnInit {
  vacantesAlumnos: Vacantes[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Vacantes> = new MatTableDataSource();

  entidadFilter = new FormControl();
  unidadCentroFilter = new FormControl();

  displayedColumns: string[];
  private filterValues = { entidad: '', unidadCentro: '' };

  constructor(
    private vacantesService: VacantesService,
    public dialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getListado();
  }

  async getListado() {
    const RESP = await this.vacantesService.getListado().toPromise();
    if (RESP.ok) {
      this.vacantesAlumnos = RESP.data as Vacantes[];
      this.displayedColumns = ["entidad", "unidad", "num_alumnos", "actions"];
      this.dataSource.data = this.vacantesAlumnos;
      this.dataSource.paginator = this.paginator;
      this.onChanges();
    }
  }

  async getAlumnosSeleccionados(vacante: Vacantes) { }

  async addVacante() {
    const dialogRef = this.dialog.open(AddVacanteComponent,
      {
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      }
    );
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.getListado();
      }
    }
  }

  async editVacante(vacante: Vacantes) {
    const dialogRef = this.dialog.open(EditVacanteComponent,
      {
        data: vacante,
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      }
    );
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.getListado();
      }
    }
  }

  async deleteVacante(vacante: Vacantes) {
    const dialogRef = this.dialog.open(DeleteVacanteComponent,
      {
        data: vacante,
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      }
    );
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.getListado();
      }
    }
  }

  async infoVacantes() {
    const RESP = await this.vacantesService.getResumen().toPromise();
    if (RESP.ok) {
      const dialogRef = this.dialog.open(InfoVacantesComponent,
        {
          data: RESP.data,
          scrollStrategy: this.overlay.scrollStrategies.noop(),
        }
      );
      const RESULT = await dialogRef.afterClosed().toPromise();
      if (RESULT) {
        if (RESULT.ok) {
          this.getListado();
        }
      }
    }
  }

  createFilter(): (unidadCentro: string, filter: string) => boolean {
    const filterFunction = (unidadCentro: string, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return (unidadCentro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1);
    };
    return filterFunction;
  }

  onChanges(): void {
    this.entidadFilter.valueChanges.subscribe((value) => {
      this.filterValues.entidad = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.unidadCentroFilter.valueChanges.subscribe((value) => {
      this.filterValues.unidadCentro = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }
}
