import { Component, OnInit } from '@angular/core';
import { TipoLancamento } from '../models/TipoLancamento';
import { OrcamentoService } from '../_services/orcamento.service';
import { TipoLancamentoService } from '../_services/tipo-lancamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';

@Component({
  selector: 'app-orcamento-novo',
  templateUrl: './orcamento-novo.component.html',
  styleUrls: ['./orcamento-novo.component.css']
})
export class OrcamentoNovoComponent implements OnInit {

  tipoLancamento = {} as TipoLancamento;
  tipos: TipoLancamento[] =[];
  data: any;

  constructor(private tipoLancamentoSerive: TipoLancamentoService, private orcamentoService: OrcamentoService, private tokenService:TokenStorageService) {}


  ngOnInit(): void {
    
    this.tipoLancamentoSerive.getTipos().subscribe(
      (data:TipoLancamento[]) => {
        this.setTipos(data);
        return data
      },
      (err:any) => {
        return [];
      }
      );
  }

  setTipos(data: TipoLancamento[]){
    this.tipos = data;
  }

}
