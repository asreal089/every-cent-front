import { Component, OnInit } from '@angular/core';
import { OrcamentoResponseDTO } from '../models/OrcamentoResponseDTO';
import { OrcamentoService } from '../_services/orcamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';
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
  constructor(private orcamentoService: OrcamentoService, private tokenStorage: TokenStorageService) {}

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
  }
  

}
