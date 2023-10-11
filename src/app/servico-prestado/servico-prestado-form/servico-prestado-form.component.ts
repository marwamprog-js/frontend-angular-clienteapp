import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestado } from '../sevicoPrestado';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css'],
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  alertSuccess: boolean = false;
  alertError: boolean = false;
  errors: String[] = [];

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
    ) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe((response) => (this.clientes = response));
  }

  onSubmit() {
    this.servicoPrestadoService.salvar(this.servicoPrestado)
      .subscribe( (response) => {
        this.alertSuccess = true;
        this.alertError = false;
        this.errors = [];
        this.servicoPrestado = new ServicoPrestado();
      }, errorResponse => {
        this.alertSuccess = false;
        this.alertError = true;
        this.errors = errorResponse.error.errors;
      } );
  }
}
