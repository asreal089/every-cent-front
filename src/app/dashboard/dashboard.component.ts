import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LancamentoResponse } from '../models/LancamentoResponse';
import { RadarChartConfig } from '../models/RadarChartConfig';
import { RadarChartData } from '../models/RadarChartData';
import { Soma } from '../models/Somas';
import { LancamentoService } from '../_services/lancamento.service';
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
  somas: Soma[] = [];
  dataRadar: RadarChartData = {};
  radarConfig: RadarChartConfig = {};
  configStack: any = {};
  dataStacked: any = {};


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
    this.lancamentos = this.lancamentos.filter(lancamento => (new Date(lancamento.data_lacamento).getMonth() == this.currentMont) && (new Date(lancamento.data_lacamento).getFullYear() == this.currentYear));
    this.receitas = this.lancamentos.filter(lancamento => lancamento.isRenda === true);
    this.gastos = this.lancamentos.filter(lancamento => lancamento.isRenda === false);
    this.tiposDeGastos = Array.from(this.gastos.reduce(
      (m, { tipo, valor }) => m.set(tipo, (m.get(tipo) || 0) + valor), new Map
    ), ([descricao, valor]) => ({ descricao, valor }));
    this.tiposDeReceitas = Array.from(this.receitas.reduce(
      (m, { tipo, valor }) => m.set(tipo, (m.get(tipo) || 0) + valor), new Map
    ), ([descricao, valor]) => ({ descricao, valor }));

    this.somas.push({ descricao: "Total de receitas", valor: this.receitas.reduce((sum, current) => sum + current.valor, 0) });
    this.somas.push({ descricao: "Total de Gastos", valor: this.gastos.reduce((sum, current) => sum + current.valor, 0) });

    this.dataRadar = {
      labels: this.tiposDeGastos.map(g => g.descricao),
      datasets: [{
        label: 'Gastos',
        data: this.tiposDeGastos.map(g => g.valor),
        fill: true
      }]
    };

    this.radarConfig = {
      type: 'radar',
      data: this.dataRadar,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    };


    this.dataStacked = {
      labels: ['lançamentos', 'orçamento'],
      datasets: [
        /*{
          label: 'Lançamentos',
          data: this.somas.filter(s => s.descricao === "Total de receitas")
        },*/
        {
          label: 'Gastos',
          data: this.somas.filter(s => s.descricao === 'Total de Gastos')
        }
      ]
    };

    this.configStack = {
      type: 'bar',
      data: this.dataStacked,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    };

  }


}
