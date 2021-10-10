import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { TipoLancamento } from '../models/TipoLancamento';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class TipoLancamentoService {
  constructor(private http: HttpClient) { }
 
  getTipos(): Observable<TipoLancamento[]> {
    return this.http.get<TipoLancamento[]>(AppConstants.TIPO_LANCAMENTO_URL, httpOptions);
  }
}