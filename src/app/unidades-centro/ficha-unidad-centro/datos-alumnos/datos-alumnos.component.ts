import { Overlay } from '@angular/cdk/overlay';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';

@Component({
  selector: 'app-datos-alumnos',
  templateUrl: './datos-alumnos.component.html',
  styleUrls: ['./datos-alumnos.component.scss']
})
export class DatosAlumnosComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

  nombreFilter = new FormControl();
  apellidosFilter = new FormControl();
  edadFilter = new FormControl();

  displayedColumns: string[];

  private filterValues = {
    nombre: '',
    apellidos: '',
    edad: 0,
  };

  constructor(
    public dialog: MatDialog,
    private alumnoService: AlumnoService,
    private overlay: Overlay,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadesCentro
  ) { }

  ngOnInit(): void {
    this.getAlumnos(this.unidadCentro.id_unidad_centro);
  }

  async getAlumnos(idCentro: number) {
    const RESP = await this.alumnoService.get(idCentro).toPromise();

    if (RESP.ok) {
      this.alumnoService.alumnos = RESP.data as Alumno[];
      this.displayedColumns = ['nombre', 'apellidos', 'edad', 'linkedin', 'actions'];
      this.dataSource.data = this.alumnoService.alumnos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  createFilter(): (alumno: Alumno, filter: string) => boolean {
    const filterFunction = (alumno: Alumno, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return alumno.nombre.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
        && alumno.apellidos.toLowerCase().indexOf(searchTerms.apellidos.toLowerCase()) !== -1
    };
    return filterFunction;
  }

  onChanges(): void {
    this.nombreFilter.valueChanges.subscribe(value => {
      this.filterValues.nombre = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.apellidosFilter.valueChanges.subscribe(value => {
      this.filterValues.apellidos = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.edadFilter.valueChanges.subscribe(value => {
      this.filterValues.edad = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  async addAlumno() {
    const dialogRef = this.dialog.open(AddAlumnoComponent,
      {
        data: this.unidadCentro.id_unidad_centro,
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      if (result.ok) {
        this.alumnoService.alumnos.push(result.data);
        this.dataSource.data = this.alumnoService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
      }
    }
  }

  async deleteAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(DeleteAlumnoComponent,
      {
        data: alumno,
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      if (result.ok) {
        this.dataSource.data = this.alumnoService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent,
      {
        data: alumno,
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      if (result.ok) {
        this.dataSource.data = this.alumnoService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
      }
    }
  }

  public linkedin(url: string): void {
    window.open(url)
  }

}
