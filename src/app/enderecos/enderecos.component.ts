import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesComponent } from '../clientes/clientes.component';
import { Endereco } from '../models/Endereco';
import { EnderecosService } from '../services/enderecos/enderecos.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {

  public enderecoForm: FormGroup;
  public titulo = 'Enderecos';

  public enderecoSelected: Endereco;
  public clienteId: number;

  public enderecos: Endereco[];

  
  constructor(private clientesComponent: ClientesComponent
    , private enderecoService: EnderecosService
    , private formBuilder: FormBuilder) { 
    
      this.criarForm();
      console.log(clientesComponent.clienteSelected)
      this.clienteId = this.clientesComponent.clienteSelected.Id;
    }

  ngOnInit(): void {

  }

  criarForm()
  {
    this.enderecoForm = this.formBuilder.group({
      Id: [''],
      Logradouro: ['', Validators.required],
      DataNascimento: [null, Validators.required],
      Sexo: ['', Validators.required]
    });
  }

  enderecoSelect(endereco: Endereco){
    this.enderecoSelected = endereco;
  }

  getEnderecos(){
    this.enderecoService.getByClientId(this.clienteId).subscribe(
      (enderecos: Endereco[]) => {
        this.enderecos = enderecos;
      },
      (exception) => {
        console.error(exception);
      }
    )
  }

  novoEndereco(){
    this.enderecoSelected = new Endereco();
    if (this.enderecoSelected !== undefined)
    { this.enderecoForm.patchValue(this.enderecoSelected); }
  }



  voltar(){
    this.enderecoSelected = null;
  }

  
  enderecoSubmit(){
    console.log("AAAAA")
    this.enderecoForm.value.Id === 0 ? this.salvarEndereco(this.enderecoForm.value) 
      : this.EditarEndereco(this.enderecoForm.value);
  }


  ExcluirEndereco(id: number){
    this.enderecoService.delete(id).subscribe(
      (endereco) => {
        this.reloadEndereco();

      },
      (exception: any) => {
        console.error(exception);
      },
    );
  }

  EditarEndereco(endereco: Endereco){
    this.enderecoService.put(endereco).subscribe(
      (endereco) => {
        this.reloadEndereco();
      },
      (exception: any) => {
        console.error(exception);
      },
    );
  }

  salvarEndereco(endereco: Endereco){
    this.enderecoService.post(endereco).subscribe(
      (endereco) => {
        console.log(endereco);
        this.reloadEndereco();
      },
      (exception: any) => {
        console.error(exception);
      },
    );
  }

  reloadEndereco() {
    this.getEnderecos();
    this.enderecoSelected = null;
  }

}
