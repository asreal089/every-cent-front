import { Component, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FormBuilder, NgForm } from "@angular/forms";
import { TipoLancamento } from '../models/TipoLancamento';
import { OrcamentoService } from '../_services/orcamento.service';
import { TipoLancamentoService } from '../_services/tipo-lancamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { Orcamento } from '../models/Orcamento';
import { OrcamentoResponseDTO } from '../models/OrcamentoResponseDTO';


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
  orcamentoID:number = 0;

  constructor(private route: ActivatedRoute, private router:Router,private fb:FormBuilder,private tipoLancamentoSerive: TipoLancamentoService, private orcamentoService: OrcamentoService, private tokenService:TokenStorageService) {}


  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.orcamentoID = params['orcamentoID']);

    console.log(this.orcamentoID);
    this.user = this.tokenService.getUser();
    this.orcamento.userID = this.user.id;

    if(this.orcamentoID === undefined || this.orcamentoID === null || this.orcamentoID === 0){
      this.orcamentoService.getOrcamentoByID(this.user.id, this.orcamentoID).subscribe((data:OrcamentoResponseDTO)=>{
        console.log(data)
        this.orcamento.tipoID = data.tipo_id;
        this.orcamento.valor_maximo= data.valor;
      });
    }


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

  onChangeTipoClassificacao(e:Event){
    if(e){
      this.tipos = this.tiposRenda;
      this.orcamento.tipoID = this.tiposRenda[0].id;
    }else{
      this.tipos = this.tiposGasto;
      this.orcamento.tipoID = this.tiposGasto[0].id;
    }
  
  }

  registrationForm = this.fb.group({
     tipo: {id:1, tipo:"salário", isRenda:true}
  })

  salvar(){
    if(this.orcamentoID === undefined || this.orcamentoID === null || this.orcamentoID === 0){
      this.orcamentoService.postOrcamentos(this.orcamento).subscribe(res => {     
        this.router.navigate(['/orcamento']);
      }, err => {
        console.log(this.orcamento);               
        console.log(err);
      });
    }else{
      this.orcamentoService.patchOrcamentos(this.orcamento, this.orcamentoID).subscribe((res)=>{
        this.router.navigate(['/orcamento']);
      },err =>{
        console.log(this.orcamento);               
        console.log(err);
      });
    }



  }

}
