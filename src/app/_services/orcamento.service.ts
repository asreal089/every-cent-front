import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Orcamento } from '../models/Orcamento';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  constructor(private http: HttpClient) { }
 
  getOrcamentos(userID:number): Observable<any> {
    return this.http.get(AppConstants.ORCAMENTO_URL + '/'+userID, httpOptions);
  }
 
  postOrcamentos(orcamento:Orcamento): Observable<any> {
    return this.http.post(AppConstants.ORCAMENTO_URL + '/'+orcamento.userID+'/'+orcamento.tipoID, {
      valor: orcamento.valor_maximo 
    }, httpOptions);
  }
}