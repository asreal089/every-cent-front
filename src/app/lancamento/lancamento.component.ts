import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { backgroundColors } from '../constChartColors';
import { LancamentoResponse } from '../models/lancamentoResponse';
import { PieChartData } from '../models/PieChartData';
import { LancamentoService } from '../_services/lancamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  currentUser:any;
  lancamentos: LancamentoResponse[]=[];
  data: LancamentoResponse[] = [];
  gastos:LancamentoResponse[]=[];
  receitas: LancamentoResponse[]=[];
  piechartdata: PieChartData={labels:[],datasets:[]};
  tiposDeGastos: string[]=[];
  valorDeGastos: number[]=[];

  constructor(private router:Router,private lancamentoService: LancamentoService, private tokenStorage: TokenStorageService) {}

  async ngOnInit(): Promise<void> {
    this.currentUser = this.tokenStorage.getUser();
    await this.lancamentoService.getLancamentos(this.currentUser.id).subscribe(
      (data:LancamentoResponse[]) => {
        this.setLancamentos(data)
        return data
        
      },
      (err:any) => {
        return err.error.message;
      }
    );

  }
  setLancamentos(data: LancamentoResponse[]) {
    this.lancamentos = data;
    this.receitas = data.filter(lancamento => lancamento.isRenda === true);
    this.gastos = data.filter(lancamento => lancamento.isRenda === false);

    this.tiposDeGastos = [];
    this.valorDeGastos = [];
    this.gastos.filter(g => (this.tiposDeGastos.push(g.tipo)));
    this.gastos.filter(g => (this.valorDeGastos.push(g.valor)));
    

    this.piechartdata = {
      labels: this.tiposDeGastos,
      datasets: [
          {
              data: this.valorDeGastos,
              backgroundColor: backgroundColors
          }]
      };
      console.log(this.gastos);
      console.log(this.receitas);
  }

  async delete(lancamentoID:number){
    await this.lancamentoService.deletelancamentos(this.currentUser.id, lancamentoID).subscribe(res => {     
      this.lancamentos = this.lancamentos.filter(o => o.lancamentoID != lancamentoID);
      this.setLancamentos(this.lancamentos);
    }, err => {               
      console.log(err);
    });
    
  }

  novoRegistro(){
    this.router.navigate(['/lancamento/registro']);
  }

  editRegistro  (lancamnetoID:number){
    this.router.navigate(['/lancamento/registro/'+lancamnetoID]);
  }

}
