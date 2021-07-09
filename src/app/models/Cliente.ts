import { Endereco } from "./Endereco";

export class Cliente{
    constructor() {
        this.Id = 0;
        this.Nome = '';
        this.DataNascimento = null;
        this.Sexo = 0;
    }

    Id: number;
    Nome: string;
    DataNascimento: Date;
    Sexo: number;
    Enderecos: Endereco[];
}