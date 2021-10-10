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

  constructor(private tipoLancamentoSerive: TipoLancamentoService, private orcamentoService: OrcamentoService, private tokenService:TokenStorageService) {}

  tipoLancamento = {} as TipoLancamento;
  tipos: TipoLancamento[] = [];

  ngOnInit(): void {
    const tiposDeLancamento = this.tipoLancamentoSerive.getTipos();
    console.log("olar")
    console.log(tiposDeLancamento);
  }

}
