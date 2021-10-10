import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
