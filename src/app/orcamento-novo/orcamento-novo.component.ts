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
  orcamento: Orcamento= {tipoID:0, userID:0, valor_maximo: 0};
  user: any;

  constructor(private fb:FormBuilder,private tipoLancamentoSerive: TipoLancamentoService, private orcamentoService: OrcamentoService, private tokenService:TokenStorageService) {}


  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.orcamento.userID = this.user.id;

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

  onChangeTipoClassificacao(e:Event){
    if(e)
      this.tipos = this.tiposRenda;
    else
      this.tipos = this.tiposGasto;
  
  }

  registrationForm = this.fb.group({
     tipo: {id:1, tipo:"salário", isRenda:true}
  })

  salvar(){
    this.orcamentoService.postOrcamentos(this.orcamento).subscribe(res => {     
      console.log(res);
    }, err => {               
      console.log(err);
    });
    console.log("salvando...");
    console.log(this.orcamento);
  }

}
