import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LancamentoResponse } from '../models/LancamentoResponse';
import { LancamentoRequest } from '../models/LancamentoRequest';
import { AppConstants } from '../app.constants';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
   
  @Injectable({
    providedIn: 'root'
  })
  export class LancamentoService {
    constructor(private http: HttpClient) { }

     
  getLancamentos(userID:number): Observable<LancamentoResponse[]> {
    return this.http.get<LancamentoResponse[]>(AppConstants.LANCAMENTO_URL + '/'+userID, httpOptions);
  }

  getLancamentosRendaByMonthYear(userID:number, mes:number, ano:number): Observable<LancamentoResponse[]> {
    return this.http.get<LancamentoResponse[]>(AppConstants.LANCAMENTO_URL + '/'+userID+'/renda/'+mes+'/'+ano, httpOptions);
  }

  getLancamentosGastosByMonthYear(userID:number, mes:number, ano:number): Observable<LancamentoResponse[]> {
    var url = AppConstants.LANCAMENTO_URL + '/'+userID+'/gasto/'+mes+'/'+ano;
    return this.http.get<LancamentoResponse[]>(url, httpOptions);
  }

  getLancamentoByID(userID:number, lancamentoID:number): Observable<LancamentoResponse> {
    const url = AppConstants.LANCAMENTO_URL + '/' + userID + '/registro/' + lancamentoID;
    return this.http.get<LancamentoResponse>(url, httpOptions);
  }
 
  postLancamento(userID:number, lancamento:LancamentoRequest): Observable<LancamentoResponse> {
    return this.http.post<LancamentoResponse>(AppConstants.LANCAMENTO_URL + '/'+userID, {
      tipoID:lancamento.tipoID,
      descricao:lancamento.descricao,
      valor:lancamento.valor,
      data_lacamento: lancamento.data_lacamento
    }, httpOptions);
  }

  patchLancamento(lancamento:LancamentoRequest, lancamnetoID:number, userID:number): Observable<LancamentoResponse> {
    return this.http.patch<LancamentoResponse>(AppConstants.LANCAMENTO_URL + '/' + userID + '/' + lancamnetoID, {
      lacamentoID: lancamnetoID,
      tipoID:lancamento.tipoID,
      descricao:lancamento.descricao,
      valor:lancamento.valor,
      data_lacamento: lancamento.data_lacamento
    }, httpOptions);
  }

  deletelancamentos(userID:number, lancamnetoID:number): Observable<void> {
    return this.http.delete<void>(AppConstants.LANCAMENTO_URL + '/' + userID + '/' + lancamnetoID, httpOptions);
  }
}