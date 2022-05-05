import { Component, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TipoLancamento } from '../models/TipoLancamento';
import { TipoLancamentoService } from '../_services/tipo-lancamento.service';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { LancamentoRequest } from '../models/LancamentoRequest';
import { LancamentoService } from '../_services/lancamento.service';
import { LancamentoResponse } from '../models/LancamentoResponse';


@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-lancamento-registro',
  templateUrl: './lancamento-registro.component.html',
  styleUrls: ['./lancamento-registro.component.css']
})
export class LancamentoRegistroComponent implements OnInit {

  stateOptions: any = [{label: 'Gasto', value: false}, {label: 'Renda', value: true}];
  value1: string = "Gasto";
  tipoLancamento = {} as TipoLancamento;
  tipos: TipoLancamento[] =[];
  tiposRenda: TipoLancamento[] =[];
  tiposGasto: TipoLancamento[] =[];
  selectedTipo: TipoLancamento = {id:1, tipo:"salário", isRenda:true}
  data: any;
  lancamento: LancamentoRequest= {
    tipoID: 0, 
    valor: 0,
    lancamentoID: 0,
    descricao: '',
    data_lacamento: new Date()
  };

  
  user: any;
  lancamentoID:number = 0;

  constructor(private route: ActivatedRoute, private router:Router, private tipoLancamentoSerive: TipoLancamentoService, private lancamentoService: LancamentoService, private tokenService:TokenStorageService) {}


  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.lancamentoID = params['lancamentoID']);

    this.user = this.tokenService.getUser();


    if(!(this.lancamentoID === undefined || this.lancamentoID === null || this.lancamentoID === 0)){
      this.lancamentoService.getLancamentoByID(this.user.id, this.lancamentoID).subscribe((data:LancamentoResponse)=>{
        this.lancamento.lancamentoID = this.lancamentoID;
        this.lancamento.tipoID = data.tipoID;
        this.lancamento.descricao = data.descricao;
        this.lancamento.valor= data.valor;
        this.lancamento.data_lacamento= new Date(data.data_lacamento);
      });

    }


    this.tipoLancamentoSerive.getTipos().subscribe(
      (data:TipoLancamento[]) => {
        this.setTipos(data);
        return data
      },
      (_err:any) => {
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
      this.lancamento.tipoID = this.tiposRenda[0].id;
    }else{
      this.tipos = this.tiposGasto;
      this.lancamento.tipoID = this.tiposGasto[0].id;
    }
  
  }

  salvar(){
    if(this.lancamentoID === undefined || this.lancamentoID === null || this.lancamentoID === 0){
      this.lancamentoService.postLancamento(this.user.id,this.lancamento).subscribe(res => {     
        this.router.navigate(['/lancamento']);
      }, err => {
        console.log(err);
      });
    }else{
      this.lancamentoService.patchLancamento(this.lancamento, this.lancamentoID, this.user.id).subscribe((res)=>{
        this.router.navigate(['/lancamento']);
      },err =>{
        console.log(err);
      });
    }



  }

}
