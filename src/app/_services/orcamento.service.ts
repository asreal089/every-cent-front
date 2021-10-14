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
  url:string='';
  constructor(private http: HttpClient) { }
 
  getOrcamentos(userID:number): Observable<OrcamentoResponseDTO[]> {
    return this.http.get<OrcamentoResponseDTO[]>(AppConstants.ORCAMENTO_URL + '/'+userID, httpOptions);
  }

  getOrcamentoByID(userID:number, orcamentoID:number): Observable<OrcamentoResponseDTO> {
    return this.http.get<OrcamentoResponseDTO>(AppConstants.ORCAMENTO_URL + '/'+userID+'/'+orcamentoID, httpOptions);
  }
 
  postOrcamentos(orcamento:Orcamento): Observable<OrcamentoResponseDTO> {
    return this.http.post<OrcamentoResponseDTO>(AppConstants.ORCAMENTO_URL + '/'+orcamento.userID+'/', {
      tipo_id: orcamento.tipoID,
      valor: orcamento.valor_maximo 
    }, httpOptions);
  }

  patchOrcamentos(orcamento:Orcamento, orcamentoID:number): Observable<OrcamentoResponseDTO> {
    return this.http.patch<OrcamentoResponseDTO>(AppConstants.ORCAMENTO_URL + '/' + orcamento.userID + '/' + orcamentoID, {
      tipo_id: orcamento.tipoID,
      valor: orcamento.valor_maximo 
    }, httpOptions);
  }

  deleteOrcamentos(userID:number, orcamentoID:number): Observable<any> {
    return this.http.delete<any>(AppConstants.ORCAMENTO_URL + '/' + userID + '/' + orcamentoID, httpOptions);
  }
}