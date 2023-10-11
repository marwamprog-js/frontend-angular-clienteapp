import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent {
  cliente: Cliente;
  alertSuccess: boolean = false;
  alertError: boolean = false;
  errors: String[] = [];
  id: number = 0;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    if (this.id && this.id > 0) {
      
      // ATUALIZAR 

      this.service
        .atualizar(this.cliente)
        .subscribe( response => {
          this.alertSuccess = true,
          this.alertError = false
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.']
        });


    } else {

      //SALVAR

      let params: Observable<Params> = this.activatedRoute.params;

      params.subscribe((params) => {
        this.id = params['id'];

        if(this.id && this.id > 0) {
          this.service.getClientesById(this.id).subscribe(
            (response) => (this.cliente = response),
            (errorResponse) => (this.cliente = new Cliente())
          );
        }
      });

    }
  }

  onSubmit() {
    this.service.salvar(this.cliente).subscribe(
      (response) => {
        this.alertSuccess = true;
        this.alertError = false;

        this.cliente = response;
      },
      (errorResponse) => {
        this.alertSuccess = false;
        this.alertError = true;
        this.errors = errorResponse.error.errors;
      }
    );
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes']);
  }
}
