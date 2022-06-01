import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  lancamentos: LancamentoResponse[] = [];
  data: LancamentoResponse[] = [];
  gastos: LancamentoResponse[] = [];
  receitas: LancamentoResponse[] = [];
  piechartdata: PieChartData = { labels: [], datasets: [] };
  tiposDeGastos: Soma[] = [];
  somas: Soma[] = [];
  mesCounter: number = 0;


  constructor(private route: ActivatedRoute, private router: Router, private lancamentoService: LancamentoService, private tokenStorage: TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.tokenStorage.getUser();
    this.route.params.subscribe((params: Params) => this.mesCounter = params['mes']);
    this.mesCounter = this.mesCounter ? this.mesCounter : 0;
    this.currentMonth++
    this.lancamentoService.getLancamentosGastosByMonthYear(this.currentMonth, this.currentYear).subscribe(
      (gastos: LancamentoResponse[]) => {
        this.gastos = gastos;
        this.somas.push({ tipo: "Total de Gastos", valor: this.gastos.reduce((sum, current) => sum + current.valor, 0) });      
        return gastos;
      },
      (err: any) => {
        return err.error.message;
      }
      );
      this.lancamentoService.getLancamentosRendaByMonthYear(this.currentMonth, this.currentYear).subscribe(
        (renda: LancamentoResponse[]) => {
          this.receitas = renda;
          this.somas.push({ tipo: "Total de receitas", valor: this.receitas.reduce((sum, current) => sum + current.valor, 0) });
        return renda;
      },
      (err: any) => {
        return err.error.message;
      }
    );

    this.lancamentoService.getGastoResumoPorMes(this.currentMonth, this.currentYear).subscribe(
      (resumo: Soma[])=>{
        this.tiposDeGastos = resumo;
        this.piechartdata = {
          labels: this.tiposDeGastos.map(g => g.tipo),
          datasets: [
            {
              data: this.tiposDeGastos.map(g => g.valor),
              backgroundColor: backgroundColors
            }]
        };

        return resumo;
      },
      (err:any)=>{
        return err.error.message;
      }
    );
 

  }

  setLancamentos(data: LancamentoResponse[]) {
    this.lancamentos = data;
    console.log("mes atual: " + this.currentMonth);
    console.log("mes atual: " + this.mesCounter);
    this.lancamentos = this.lancamentos.filter(lancamento => 
      (new Date(lancamento.data_lacamento).getMonth() == this.currentMonth - this.mesCounter % 12)
      && (new Date(lancamento.data_lacamento).getFullYear() == this.currentYear - Math.floor(this.mesCounter/12)));
      
    this.receitas = this.lancamentos.filter(lancamento => lancamento.isRenda === true);
    this.gastos = this.lancamentos.filter(lancamento => lancamento.isRenda === false);
    
    this.tiposDeGastos = [];
    this.somas = [];


  }

  async delete(lancamentoID: number) {
    this.lancamentoService.deletelancamentos(lancamentoID).subscribe(res => {
      console.log(res)
      window.location.reload();
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
