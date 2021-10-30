import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { backgroundColors } from '../constChartColors';
import { LancamentoResponse } from '../models/LancamentoResponse';
import { PieChartData } from '../models/PieChartData';
import { Soma } from '../models/Somas';
import { LancamentoService } from '../_services/lancamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  currentUser: any;
  currentMont: number = new Date().getMonth(); 
  currentYear: number = new Date().getFullYear();
  lancamentos: LancamentoResponse[] = [];
  data: LancamentoResponse[] = [];
  gastos: LancamentoResponse[] = [];
  receitas: LancamentoResponse[] = [];
  piechartdata: PieChartData = { labels: [], datasets: [] };
  tiposDeGastos: Soma[] = [];
  somas: Soma[]=[]; 


  constructor(private router: Router, private lancamentoService: LancamentoService, private tokenStorage: TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.tokenStorage.getUser();
    await this.lancamentoService.getLancamentos(this.currentUser.id).subscribe(
      (data: LancamentoResponse[]) => {
        this.setLancamentos(data)
        return data;
      },
      (err: any) => {
        return err.error.message;
      }
    );
  }
  setLancamentos(data: LancamentoResponse[]) {
    this.lancamentos = data;
    this.lancamentos = this.lancamentos.filter(lancamento => (new Date(lancamento.data_lacamento).getMonth() == this.currentMont)&&(new Date(lancamento.data_lacamento).getFullYear() == this.currentYear));
    this.receitas = this.lancamentos.filter(lancamento => lancamento.isRenda === true);
    this.gastos = this.lancamentos.filter(lancamento => lancamento.isRenda === false);

    this.tiposDeGastos = [];
    
    this.tiposDeGastos = Array.from(this.gastos.reduce(
      (m, {tipo, valor}) => m.set(tipo, (m.get(tipo) || 0) + valor), new Map
    ), ([descricao, valor]) => ({descricao, valor}));

    this.somas.push({descricao: "Total de receitas",valor : this.receitas.reduce((sum, current) => sum + current.valor, 0)});
    this.somas.push({descricao: "Total de Gastos",valor : this.gastos.reduce((sum, current) => sum + current.valor, 0)});
    

    this.piechartdata = {
      labels: this.tiposDeGastos.map(g => g.descricao),
      datasets: [
        {
          data: this.tiposDeGastos.map(g => g.valor),
          backgroundColor: backgroundColors
        }]
    };

  }

  async delete(lancamentoID: number) {
    await this.lancamentoService.deletelancamentos(this.currentUser.id, lancamentoID).subscribe(res => {
      this.lancamentos = this.lancamentos.filter(o => o.lancamentoID != lancamentoID);
      this.setLancamentos(this.lancamentos);
    }, err => {
      console.log(err);
    });

  }

  novoRegistro() {
    this.router.navigate(['/lancamento/registro']);
  }

  editRegistro(lancamnetoID: number) {
    this.router.navigate(['/lancamento/registro/' + lancamnetoID]);
  }

}
