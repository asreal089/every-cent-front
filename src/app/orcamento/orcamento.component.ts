import { Component, OnInit } from '@angular/core';
import { OrcamentoResponseDTO } from '../models/OrcamentoResponseDTO';
import { OrcamentoService } from '../_services/orcamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { Router } from '@angular/router';
import {TableModule} from 'primeng/table';
import {MenuItem, PrimeIcons} from 'primeng/api';
import { PieChartData } from '../models/PieChartData';
import { hoverColor } from '../constChartColors';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {
  currentUser:any;
  orcamentos: OrcamentoResponseDTO[]=[];
  data: OrcamentoResponseDTO[] = [];
  gastos:OrcamentoResponseDTO[]=[];
  receitas: OrcamentoResponseDTO[]=[];
  piechartdata: PieChartData={labels:[],datasets:[]};
  tiposDeGastos: string[]=[];
  valorDeGastos: number[]=[];

  constructor(private router:Router,private orcamentoService: OrcamentoService, private tokenStorage: TokenStorageService) {}

  async ngOnInit(): Promise<void> {
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser);
    await this.orcamentoService.getOrcamentos(this.currentUser.id).subscribe(
      (data:OrcamentoResponseDTO[]) => {
        this.setOrcamentos(data)
        return data
        
      },
      (err:any) => {
        return err.error.message;
      }
    );

  }
  setOrcamentos(data: OrcamentoResponseDTO[]) {
    this.orcamentos = data;
    this.receitas = data.filter(o => o.is_renda === true);
    this.gastos = data.filter(o=>o.is_renda===false);

    this.tiposDeGastos = [];
    this.valorDeGastos = [];
    this.gastos.filter(g => (this.tiposDeGastos.push(g.tipo)));
    this.gastos.filter(g => (this.valorDeGastos.push(g.valor)));
    

    this.piechartdata = {
      labels: this.tiposDeGastos,
      datasets: [
          {
              data: this.valorDeGastos,
              backgroundColor: hoverColor
          }]
      };
  }

  async delete(orcamentoID:any){
    await this.orcamentoService.deleteOrcamentos(this.currentUser.id, orcamentoID).subscribe(res => {     
      this.orcamentos = this.orcamentos.filter(o => o.id != orcamentoID);
      this.setOrcamentos(this.orcamentos);
    }, err => {               
      console.log(err);
    });
    
  }

  novoRegistro(){
    this.router.navigate(['/orcamento/novo']);
  }

  editRegistro  (orcamentoID:number){
    this.router.navigate(['/orcamento/novo/'+orcamentoID]);
  }

}
