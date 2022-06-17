import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { backgroundColors } from '../constChartColors';
import { BarchartConfig } from '../models/BarchartConfig';
import { BarchartData } from '../models/BarchartData';
import { LancamentoResponse } from '../models/LancamentoResponse';
import { OrcamentoResponseDTO } from '../models/OrcamentoResponseDTO';
import { RadarChartData } from '../models/RadarChartData';
import { Soma } from '../models/Somas';
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
  lancamentos: LancamentoResponse[] = [];
  data: LancamentoResponse[] = [];
  gastos: LancamentoResponse[] = [];
  receitas: LancamentoResponse[] = [];
  tiposDeGastos: Soma[] = [];
  tiposDeReceitas: Soma[] = [];
  orcamentos: OrcamentoResponseDTO[] = [];
  somas: Soma[] = [];
  dataRadar: RadarChartData = {labels:[], datasets:[]};
  dataBar: BarchartConfig = {};
  

  constructor(private router: Router, private lancamentoService: LancamentoService, private orcamentoService:OrcamentoService, private tokenStorage: TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.tokenStorage.getUser();
    this.lancamentoService.getLancamentos().subscribe(
      (data: LancamentoResponse[]) => {
        this.setLancamentos(data)
        return data;
      },
      (err: any) => {
        return err.error.message;
      }
    );

    this.orcamentoService.getOrcamentos().subscribe(
      (data: OrcamentoResponseDTO[]) => {
        this.setOrcamentos(data);

        return data;

      },
      (err: any) => {
        return err.error.message;
      }
    );

  }

  setOrcamentos(data: OrcamentoResponseDTO[]){
    this.orcamentos = data;
  }
  setLancamentos(data: LancamentoResponse[]) {
    this.lancamentos = data;
    this.lancamentos = this.lancamentos.filter(lancamento => (new Date(lancamento.data_lacamento).getMonth() == this.currentMont) && (new Date(lancamento.data_lacamento).getFullYear() == this.currentYear));
    this.receitas = this.lancamentos.filter(lancamento => lancamento.isRenda === true);
    this.gastos = this.lancamentos.filter(lancamento => lancamento.isRenda === false);
    this.tiposDeGastos = Array.from(this.gastos.reduce(
      (m, { tipo, valor }) => m.set(tipo, (m.get(tipo) || 0) + valor), new Map
    ), ([tipo, valor]) => ({ tipo, valor }));
    this.tiposDeReceitas = Array.from(this.receitas.reduce(
      (m, { tipo, valor }) => m.set(tipo, (m.get(tipo) || 0) + valor), new Map
    ), ([tipo, valor]) => ({ tipo, valor }));

    this.somas.push({ tipo: "Total de receitas", valor: this.receitas.reduce((sum, current) => sum + current.valor, 0) });
    this.somas.push({ tipo: "Total de Gastos", valor: this.gastos.reduce((sum, current) => sum + current.valor, 0) });

    this.dataRadar = {
      labels: this.tiposDeGastos.map(g => g.tipo),
      datasets: [{
        label: 'Gastos',
        data: this.tiposDeGastos.map(g => g.valor),
        fill: true
      }]
    };

    this.orcamentos = this.orcamentos.filter(e => !e.is_renda);
    this.orcamentos.sort((a, b) => a.tipo.localeCompare(b.tipo));
    this.tiposDeGastos.sort((a,b) => a.tipo.localeCompare(b.tipo))

    console.log(this.orcamentos)
    console.log(this.tiposDeGastos)


    this.dataBar = {
      labels: this.tiposDeGastos.map(g => g.tipo),
      datasets: [{
        label: 'Gastos',
        data: this.tiposDeGastos.map(g => g.valor),
        backgroundColor: "#4A148C"
      },{
        label: 'Orçamento',
        data: this.orcamentos.map(g => g.valor),
        backgroundColor: "#6A1B9A"
      }]
    };
  }


}
