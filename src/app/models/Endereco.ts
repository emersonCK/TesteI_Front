export class Endereco{
    /**
     *
     */
    constructor() {
        this.Id = 0;
        this.Logradouro = '';
        this.Numero = null;
        this.Complemento = '';
        this.Bairro = '';
        this.Uf = '';
    }
    Id: number;
    Logradouro: string;
    Numero: number;
    Complemento: string;
    Cep: string;
    Bairro: string;
    Uf: string;
}