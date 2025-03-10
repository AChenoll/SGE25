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
}
