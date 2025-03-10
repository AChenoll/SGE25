import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { UnidadesCentroService } from '../services/unidades-centro.service';
import { Overlay } from '@angular/cdk/overlay';
import { AddUnidadCentroComponent } from './add-unidad-centro/add-unidad-centro.component';
import { EditUnidadCentroComponent } from './edit-unidad-centro/edit-unidad-centro.component';
import { DeleteUnidadCentroComponent } from './delete-unidad-centro/delete-unidad-centro.component';

@Component({
  selector: 'app-unidades-centro',
  templateUrl: './unidades-centro.component.html',
  styleUrls: ['./unidades-centro.component.scss']
})
export class UnidadesCentroComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<UnidadesCentro> = new MatTableDataSource();

  idUnidadCentroFilter= new FormControl();
  unidadCentroFilter= new FormControl();
  idCicloFilter= new FormControl();

  permises: Permises;

  selection: SelectionModel<UnidadesCentro>;
  unidadCentro: UnidadesCentro;

  displayedColumns: string[];
  private filterValues = {id_unidad_centro: '', unidad_centro: '', id_ciclo: ''};

  constructor(
    public dialog: MatDialog,
    private unidadesCentroService: UnidadesCentroService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getUnidadesCentro();
  }

  async getUnidadesCentro(){
    const RESPONSE = await this.unidadesCentroService.getAllUnidadesCentro().toPromise();
    this.permises = RESPONSE.permises;

    if(RESPONSE.ok){
      this.unidadesCentroService.unidadCentro = RESPONSE.data as UnidadesCentro[];
      this.displayedColumns = ['id_unidad_centro', 'unidad_centro', 'id_ciclo', 'actions'];
      this.dataSource.data = this.unidadesCentroService.unidadCentro;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<UnidadesCentro>(false, [this.unidadCentro]);

      this.onChanges();
    }
  }

  async addUnidadCentro() {
    const dialogRef = this.dialog.open(AddUnidadCentroComponent, { scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.unidadesCentroService.unidadCentro.push(RESULT.data);
        this.dataSource.data = this.unidadesCentroService.unidadCentro;
        this.ngOnInit();
      }
    }
  }

  async editUnidadCentro(unidadCentro: UnidadesCentro) {
    const dialogRef = this.dialog.open(EditUnidadCentroComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.unidadesCentroService.editUnidadCentro(RESULT.data);
        this.dataSource.data = this.unidadesCentroService.unidadCentro;
        this.ngOnInit();
      }
    }
  }

  async deleteUnidadCentro(unidadCentro: UnidadesCentro){
    const dialogRef = this.dialog.open(DeleteUnidadCentroComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.unidadesCentroService.deleteUnidadCentro(RESULT.data);
        this.dataSource.data = this.unidadesCentroService.unidadCentro;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (data: UnidadesCentro, filter: string) => boolean {
    const filterFunction = (unidadCentro: UnidadesCentro, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return unidadCentro.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
        && unidadCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
        && unidadCentro.id_ciclo.toString().indexOf(searchTerms.id_ciclo) !== -1;
    };
    return filterFunction;
  }

  onChanges() {
    this.idUnidadCentroFilter.valueChanges.subscribe(value => {
      this.filterValues.id_unidad_centro = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.unidadCentroFilter.valueChanges.subscribe(value => {
      this.filterValues.unidad_centro = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idCicloFilter.valueChanges.subscribe(value => {
      this.filterValues.id_ciclo = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

}
