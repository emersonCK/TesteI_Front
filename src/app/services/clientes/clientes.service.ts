import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  baseUrl = `${environment.baseUrl}/clientes`;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>  {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

  getClientById(id: number): Observable<Cliente>  {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  post(cliente: Cliente){
    return this.http.post<Cliente>(`${this.baseUrl}`, cliente);
  }

  put(cliente: Cliente){
    return this.http.post<Cliente>(`${this.baseUrl}`, cliente);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
