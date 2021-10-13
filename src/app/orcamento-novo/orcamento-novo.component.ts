import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from "@angular/forms";
import { TipoLancamento } from '../models/TipoLancamento';
import { OrcamentoService } from '../_services/orcamento.service';
import { TipoLancamentoService } from '../_services/tipo-lancamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { Orcamento } from '../models/Orcamento';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-orcamento-novo',
  templateUrl: './orcamento-novo.component.html',
  styleUrls: ['./orcamento-novo.component.css']
})
export class OrcamentoNovoComponent implements OnInit {

  stateOptions: any = [{label: 'Gasto', value: false}, {label: 'Renda', value: true}];
  value1: string = "Gasto";
  tipoLancamento = {} as TipoLancamento;
  tipos: TipoLancamento[] =[];
  tiposRenda: TipoLancamento[] =[];
  tiposGasto: TipoLancamento[] =[];
  selectedTipo: TipoLancamento = {id:1, tipo:"salário", isRenda:true}
  data: any;
  orcamento!: Orcamento;

  constructor(private fb:FormBuilder,private tipoLancamentoSerive: TipoLancamentoService, private orcamentoService: OrcamentoService, private tokenService:TokenStorageService) {}


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
    this.tiposRenda = data.filter(o => o.isRenda === true);
    this.tiposGasto = data.filter(o => o.isRenda === false);
    this.tipos = data;
  }

  changeTipo(e:Event){

  }

  onChangeTipo(e:Event){
    if(e)
      this.tipos = this.tiposRenda;
    else
      this.tipos = this.tiposGasto;
  
  }

  registrationForm = this.fb.group({
     tipo: {id:1, tipo:"salário", isRenda:true}
  })

  salvar(f:NgForm){
    console.log(f)
  }

}
