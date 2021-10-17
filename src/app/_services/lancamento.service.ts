import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LancamentoResponse } from '../models/lancamentoResponse';
import { LancamentoRequest } from '../models/lancamentoRequest';
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

  getLancamentoByID(userID:number, lancamentoID:number): Observable<LancamentoResponse> {
    return this.http.get<LancamentoResponse>(AppConstants.LANCAMENTO_URL + '/'+userID+'/'+lancamentoID, httpOptions);
  }
 
  postLancamento(userID:number, lancamento:LancamentoRequest): Observable<LancamentoResponse> {
    return this.http.post<LancamentoResponse>(AppConstants.LANCAMENTO_URL + '/'+userID+'/', {
        lancamento
    }, httpOptions);
  }

  patchLancamento(lancamento:LancamentoRequest, lancamnetoID:number, userID:string): Observable<LancamentoResponse> {
    return this.http.patch<LancamentoResponse>(AppConstants.LANCAMENTO_URL + '/' + userID + '/' + lancamnetoID, {
        lancamento
    }, httpOptions);
  }

  deletelancamentos(userID:number, lancamnetoID:number): Observable<any> {
    return this.http.delete<any>(AppConstants.LANCAMENTO_URL + '/' + userID + '/' + lancamnetoID, httpOptions);
  }
}