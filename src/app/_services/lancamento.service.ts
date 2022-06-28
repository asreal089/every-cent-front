import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LancamentoResponse } from '../models/LancamentoResponse';
import { LancamentoRequest } from '../models/LancamentoRequest';
import { Soma } from '../models/Somas';
import { AppConstants } from '../app.constants';
import { Observable } from 'rxjs';
import { SomaGastoOrcamento } from '../models/SomaGastoOrcamento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  constructor(private http: HttpClient) {}

  getLancamentos(): Observable<LancamentoResponse[]> {
    return this.http.get<LancamentoResponse[]>(
      AppConstants.LANCAMENTO_URL + '/',
      httpOptions
    );
  }

  getLancamentosRendaByMonthYear(
    mes: number,
    ano: number
  ): Observable<LancamentoResponse[]> {
    return this.http.get<LancamentoResponse[]>(
      AppConstants.LANCAMENTO_URL + '/renda/' + mes + '/' + ano,
      httpOptions
    );
  }

  getLancamentosGastosByMonthYear(
    mes: number,
    ano: number
  ): Observable<LancamentoResponse[]> {
    const url = AppConstants.LANCAMENTO_URL + '/gasto/' + mes + '/' + ano;
    return this.http.get<LancamentoResponse[]>(url, httpOptions);
  }

  getLancamentoByID(lancamentoID: number): Observable<LancamentoResponse> {
    const url = AppConstants.LANCAMENTO_URL + '/registro/' + lancamentoID;
    return this.http.get<LancamentoResponse>(url, httpOptions);
  }

  getGastoResumoPorMes(mes: number, ano: number){
    const url = AppConstants.LANCAMENTO_URL + '/resumo/gasto/'+mes+'/'+ano
    return this.http.get<Soma[]>(url, httpOptions);
  }

  getGastoVOrcamentoResumoPorMes(mes: number, ano: number){
    const url = AppConstants.LANCAMENTO_URL + '/resumo/gasto-orcamento/'+mes+'/'+ano
    return this.http.get<SomaGastoOrcamento[]>(url, httpOptions);
  }

  postLancamento(
    lancamento: LancamentoRequest
  ): Observable<LancamentoResponse> {
    return this.http.post<LancamentoResponse>(
      AppConstants.LANCAMENTO_URL + '/',
      {
        tipoID: lancamento.tipoID,
        descricao: lancamento.descricao,
        valor: lancamento.valor,
        data_lacamento: lancamento.data_lacamento,
      },
      httpOptions
    );
  }

  patchLancamento(
    lancamento: LancamentoRequest,
    lancamnetoID: number
  ): Observable<LancamentoResponse> {
    return this.http.patch<LancamentoResponse>(
      AppConstants.LANCAMENTO_URL + '/' + lancamnetoID,
      {
        lacamentoID: lancamnetoID,
        tipoID: lancamento.tipoID,
        descricao: lancamento.descricao,
        valor: lancamento.valor,
        data_lacamento: lancamento.data_lacamento,
      },
      httpOptions
    );
  }

  deletelancamentos(lancamnetoID: number): Observable<void> {
    return this.http.delete<void>(
      AppConstants.LANCAMENTO_URL + '/' + lancamnetoID,
      httpOptions
    );
  }
}
