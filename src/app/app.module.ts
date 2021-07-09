import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { NavComponent } from './nav/nav.component';
import { TituloComponent } from './titulo/titulo.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    EnderecosComponent,
    NavComponent,
    TituloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    ClientesComponent,
    EnderecosComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
