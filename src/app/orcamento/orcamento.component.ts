import { Component, OnInit } from '@angular/core';
import { OrcamentoResponseDTO } from '../models/OrcamentoResponseDTO';
import { OrcamentoService } from '../_services/orcamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { Router } from '@angular/router';
import {TableModule} from 'primeng/table';
import {MenuItem, PrimeIcons} from 'primeng/api';

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
  }

  async delete(orcamentoID:any){
    await this.orcamentoService.deleteOrcamentos(this.currentUser.id, orcamentoID).subscribe(res => {     
      this.orcamentos = this.orcamentos.filter(o => o.id != orcamentoID);
      this.receitas = this.orcamentos.filter(o => o.is_renda === true);
      this.gastos = this.orcamentos.filter(o=>o.is_renda===false);
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
