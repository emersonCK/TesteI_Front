import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from 'src/app/models/Endereco';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  baseUrl = `${environment.baseUrl}/enderecos`;

  constructor(private http: HttpClient) { }

  getByClientId(id: number): Observable<Endereco[]>  {
    return this.http.get<Endereco[]>(`${this.baseUrl}/${id}`);
  }

  post(cliente: Endereco){
    return this.http.post<Endereco>(`${this.baseUrl}`, cliente);
  }

  put(cliente: Endereco){
    return this.http.post<Endereco>(`${this.baseUrl}`, cliente);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  

}
