import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cliente } from '../models/Cliente';
import { Endereco } from '../models/Endereco';
import { ClientesService } from '../services/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public modalRef: BsModalRef;
  public clienteForm: FormGroup;

  public titulo = 'Clientes';
  public clienteSelected: Cliente;
  public enderecosClienteSelected: Endereco[];

  public clientes: Cliente[];

  constructor(private formBuilder: FormBuilder
    , private modalService: BsModalService
    , private clienteService: ClientesService) {

    this.criarForm();
   }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getClientes().subscribe(
      (clientes: Cliente[]) => {
        console.log(clientes)
        this.clientes = clientes;
        console.log(this.clientes )
      },
      (exception) => {
        console.error(exception);
      }
    )
  }

  criarForm()
  {
    this.clienteForm = this.formBuilder.group({
      Id: [''],
      Nome: ['', Validators.required],
      DataNascimento: [null, Validators.required],
      Sexo: ['', Validators.required]
    });
  }

  clienteSelect(cliente: Cliente, endereco: Endereco[]){
    this.clienteSelected = cliente;
    console.log(this.clienteSelected);
    this.clienteForm = new FormGroup(
      {
        Id: new FormControl(cliente.Id),
        DataNascimento: new FormControl(new Date(cliente.DataNascimento).toISOString().substring(0,10)),
        Nome: new FormControl(cliente.Nome, [ Validators.required, Validators.minLength(4)]),
        Sexo: new FormControl(cliente.Sexo)
      });
  }

  novoCliente(){
    this.clienteSelected = new Cliente();
    this.clienteForm.patchValue(this.clienteSelected);
  }

  voltar(){
    this.clienteSelected = null;
  }

  clienteSubmit(){
    console.log(this.clienteForm.value);
    this.clienteForm.value.Id === 0 ? this.salvarCliente(this.clienteForm.value) 
      : this.EditarCliente(this.clienteForm.value);
  }
  
  ExcluirCliente(id: number){
    this.clienteService.delete(id).subscribe(
      (cliente) => {
        console.log(cliente);
        this.getClientes();
      },
      (exception: any) => {
        console.error(exception);
      },
    );
  }

  EditarCliente(cliente: Cliente){
    this.clienteService.put(cliente).subscribe(
      (cliente) => {
        console.log(cliente);
        this.getClientes();
        this.clienteSelected = null;

      },
      (exception: any) => {
        console.error(exception);
      },
    );
  }

  salvarCliente(cliente: Cliente){
    this.clienteService.post(cliente).subscribe(
      (cliente) => {
        console.log(cliente);
        this.getClientes();
        this.clienteSelected = null;
      },
      (exception: any) => {
        console.error(exception);
      },
    );
  }

}
