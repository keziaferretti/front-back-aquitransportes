import UsuarioBD from "../Persistencia/UsuarioBD.js";
export default class Usuario{

    #cpf;
    #nome;
    #tipo;
    #cep;
    #endereco;
    #bairro;
    #cidade;
    #estado;
    #telefone;
    #email;

    constructor(cpf,nome,tipo,endereco,cep,bairro,cidade,estado,telefone,email){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#tipo = tipo;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#telefone = telefone;
        this.#email = email;
    }

    //METODO CPF
    get cpf(){
        return this.#cpf;
    }
    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    //METODO NOME
    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        this.#nome = novoNome;
    }

    //METODO TIPO
    get tipo(){
        return this.#tipo;
    }
    set tipo(novoTipo){
        this.#tipo = novoTipo;
    }
    
    //METODO CEP
    get cep(){
        return this.#cep;
    }
    set cep(novoCep){
        this.#cep = novoCep;
    }

    //METODO ENDEREÇO
    get endereco(){
        return this.#endereco;
    }
    set endereco(novoEnd){
        this.#endereco = novoEnd;
    }

    //METODO BAIRRO
    get bairro(){
        return this.#bairro;
    }
    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    //METODO CIDADE
    get cidade(){
        return this.#cidade;
    }
    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    //METODO ESTADO
    get estado(){
        return this.#estado;
    }
    set estado(novoEstado){
        this.#estado = novoEstado;
    }

    //METODO TELEFONE
    get telefone(){
        return this.#telefone;
    }
    set telefone(novoTel){
        this.#telefone = novoTel;
    }

    //METODO EMAIL
    get email(){
        return this.#email;
    }
    set email(novoEmail){
        this.#email = novoEmail;
    }

    toJSON(){
        return{
            "cpf" : this.#cpf,
            "nome" : this.#nome,
            "tipo": this.#tipo,
            "cep": this.#cep,
            "endereco": this.#endereco,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "estado":  this.#estado,
            "telefone": this.#telefone,
            "email": this.#email
        }
    }

    async gravar(){
        const usuarioBD = new UsuarioBD();
        await usuarioBD.adicionar(this);
    }

    async atualizar(){
        const usuarioBD = new UsuarioBD();
        await usuarioBD.alterar(this);
    }

    async removerDoBancoDeDados(){
        const usuarioBD = new UsuarioBD();
        await usuarioBD.excluir(this);
    }

    async consultar(termo){
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultar(termo);
        return usuarios;
    }

    async consultarCPF(cpf){
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultarCPF(cpf);
        return usuarios;
    }

}