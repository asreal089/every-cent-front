import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Orcamento } from '../models/Orcamento';
import { OrcamentoResponseDTO } from '../models/OrcamentoResponseDTO';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  constructor(private http: HttpClient) { }
 
  getOrcamentos(): Observable<OrcamentoResponseDTO[]> {
    return this.http.get<OrcamentoResponseDTO[]>(AppConstants.ORCAMENTO_URL + '/', httpOptions);
  }

  getOrcamentoByID(orcamentoID:number): Observable<OrcamentoResponseDTO> {
    return this.http.get<OrcamentoResponseDTO>(AppConstants.ORCAMENTO_URL + '/'+orcamentoID, httpOptions);
  }
 
  postOrcamentos(orcamento:Orcamento): Observable<OrcamentoResponseDTO> {
    return this.http.post<OrcamentoResponseDTO>(AppConstants.ORCAMENTO_URL + '/', {
      tipo_id: orcamento.tipoID,
      valor: orcamento.valor_maximo 
    }, httpOptions);
  }

  patchOrcamentos(orcamento:Orcamento, orcamentoID:number): Observable<OrcamentoResponseDTO> {
    return this.http.patch<OrcamentoResponseDTO>(AppConstants.ORCAMENTO_URL + '/' + orcamentoID, {
      tipo_id: orcamento.tipoID,
      valor: orcamento.valor_maximo 
    }, httpOptions);
  }

  deleteOrcamentos(orcamentoID:number): Observable<any> {
    return this.http.delete<any>(AppConstants.ORCAMENTO_URL + '/' + orcamentoID, httpOptions);
  }
}