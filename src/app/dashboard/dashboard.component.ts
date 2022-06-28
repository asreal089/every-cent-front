import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarchartConfig } from '../models/BarchartConfig';
import { RadarChartData } from '../models/RadarChartData';
import { SomaGastoOrcamento } from '../models/SomaGastoOrcamento';
import { LancamentoService } from '../_services/lancamento.service';
import { OrcamentoService } from '../_services/orcamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';

const newLocal = ['lançamentos', 'orçamento'];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  currentMont: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  somaGastoOrcamento: SomaGastoOrcamento[] = [];
  dataRadar: RadarChartData = {labels:[], datasets:[]};
  dataBar: BarchartConfig = {};
  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  

  constructor(private router: Router, private lancamentoService: LancamentoService, private orcamentoService:OrcamentoService, private tokenStorage: TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.tokenStorage.getUser();

    this.lancamentoService.getGastoVOrcamentoResumoPorMes(this.currentMont, this.currentYear).subscribe(
      (data: SomaGastoOrcamento[])=>{
        this.somaGastoOrcamento = data;
        this.setDados();
        return data;
      },
      (err:any)=>{
        return err.error.message;
      }
    );

  }

 
  setDados() {

    this.dataRadar = {
      labels: this.somaGastoOrcamento.map(g => g.tipo),
      datasets: [{
        label: 'Gastos',
        data: this.somaGastoOrcamento.map(g => g.valorGasto),
        fill: true
      }]
    };
   


    this.dataBar = {
      labels: this.somaGastoOrcamento.map(g => g.tipo),
      datasets: [{
        label: 'Gastos',
        data: this.somaGastoOrcamento.map(g => g.valorGasto),
        backgroundColor: "#4A148C"
      },{
        label: 'Orçamento',
        data: this.somaGastoOrcamento.map(g => g.valorOrcamento),
        backgroundColor: "#6A1B9A"
      }]
    };
  }


}
