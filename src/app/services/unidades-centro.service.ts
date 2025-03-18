import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';

const ENDPOINT = 'unidad_centro';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCentroService {

  unidadesCentro: UnidadesCentro;
  unidadCentro: UnidadesCentro[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllUnidadesCentro() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUnidadCentro(unidad_centro: UnidadesCentro) {
    const body = JSON.stringify(unidad_centro);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUnidadCentro(unidad_centro: UnidadesCentro) {
    const body = JSON.stringify(unidad_centro);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteUnidadCentro(unidad_centro: UnidadesCentro) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${unidad_centro.id_unidad_centro}`, {headers: this.commonService.headers });
  }

  setUnidadCentro(unidad_centro: UnidadesCentro) {
    this.unidadesCentro = unidad_centro;
  }

  setDatosUnidadCentro(formUnidadCentro: any) {
    this.unidadesCentro.id_unidad_centro = formUnidadCentro.id_unidad_centro;
    this.unidadesCentro.unidad_centro = formUnidadCentro.unidad_centro;
    this.unidadesCentro.id_ciclo = formUnidadCentro.id_ciclo;
    this.unidadesCentro.ciclo = formUnidadCentro.ciclo;
    this.unidadesCentro.observaciones = formUnidadCentro.observaciones;
  }
}
