import { Component, OnInit } from '@angular/core';

import { Cadastro } from './cadastro';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  model = new Cadastro("email", "password");
  salvar(){
    console.log("salvando");
  }
  ngOnInit(): void {
  }

}
