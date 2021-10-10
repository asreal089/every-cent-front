import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
 
  getOrcamentos(userID:number): Observable<any> {
    return this.http.get(AppConstants.ORCAMENTO_URL + '/'+userID, httpOptions);
  }
 
  postOrcamentos(userID:number, tipoId:number, valor:number): Observable<any> {
    return this.http.post(AppConstants.ORCAMENTO_URL + '/'+userID+'/'+tipoId, {
      valor: valor 
    }, httpOptions);
  }
}