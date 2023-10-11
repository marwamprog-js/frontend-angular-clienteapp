import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicoPrestado } from './servico-prestado/sevicoPrestado';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})

export class ServicoPrestadoService {

  apiURLBase: string = environment.apiURLBase + "/api/servicos-prestados";
  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: ServicoPrestado) : Observable<ServicoPrestado> {

    console.log(servicoPrestado);

    return this.http.post<ServicoPrestado>(`${this.apiURLBase}`, servicoPrestado);
  }


  buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]> {

    const httpParams = new HttpParams().set("nome", nome).set("mes", mes.toString());

    const url = this.apiURLBase + "?" + httpParams.toString();
    console.log(url)
    return this.http.get<any>(url);
  }
}
