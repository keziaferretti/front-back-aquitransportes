var formulario = document.getElementById("formUsuario");
const urlBackEnd='http://localhost:3006/usuarios'

formulario.onsubmit = manipularSubmissaoDadosFormulario;


document.getElementById("excluir").onclick = excluirUsuario;
document.getElementById("atualizar").onclick = atualizarUsuario;

function limparTela(){
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
}

function exibirUsuarioFormTabela(listaUsuario){
    let divTabela = document.getElementById("tabela");
    let tabela = document.createElement('table');
    tabela.className = "table table-striped";

    let cabecalho = document.createElement('thead');
    cabecalho.innerHTML=`<tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Tipo</th>
                            <th>Endereço</th>
                            <th>CEP</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>`
                        
    tabela.appendChild(cabecalho);
    let corpo = document.createElement('tbody');
    for (let i=0; i < listaUsuario.length; i++){
        let linha = document.createElement('tr');
        linha.innerHTML=`<td>${listaUsuario[i].nome}</td>
                        <td>${listaUsuario[i].cpf}</td>
                        <td>${listaUsuario[i].tipo}</td>
                        <td>${listaUsuario[i].endereco}</td>
                        <td>${listaUsuario[i].cep}</td>
                        <td>${listaUsuario[i].bairro}</td>
                        <td>${listaUsuario[i].cidade}</td>
                        <td>${listaUsuario[i].estado}</td>
                        <td>${listaUsuario[i].telefone}</td>
                        <td>${listaUsuario[i].email}</td>
                        <td>
                        <button onclick="selecionarRegistro(
                            '${listaUsuario[i].nome}',
                            '${listaUsuario[i].cpf}',
                            '${listaUsuario[i].tipo}',
                            '${listaUsuario[i].endereco}',
                            '${listaUsuario[i].cep}',
                            '${listaUsuario[i].bairro}',
                            '${listaUsuario[i].cidade}',
                            '${listaUsuario[i].estado}',
                            '${listaUsuario[i].telefone}',
                            '${listaUsuario[i].email}',
                            'atualizar')" type="button" class="btn btn-outline-warning">Alterar</button>
                        <button onclick="selecionarRegistro(
                            '${listaUsuario[i].nome}',
                            '${listaUsuario[i].cpf}',
                            '${listaUsuario[i].tipo}',
                            '${listaUsuario[i].endereco}',
                            '${listaUsuario[i].cep}',
                            '${listaUsuario[i].bairro}',
                            '${listaUsuario[i].cidade}',
                            '${listaUsuario[i].estado}',
                            '${listaUsuario[i].telefone}',
                            '${listaUsuario[i].email}',
                            'excluir')"type="button" class="btn btn-outline-danger">Excluir</button>
                        </td>`
        corpo.appendChild(linha);
    }
    tabela.appendChild(corpo)
    divTabela.innerHTML="";
    divTabela.appendChild(tabela)
}

function obterUsuarioBackend(){
    fetch(urlBackEnd, {method:"GET"})
    .then((resposta) => {
        return resposta.json();
    })
    .then((dados) =>{
        if (dados.length > 0){
            exibirUsuarioFormTabela(dados);
        }else{
            mensagem.innerHTML=`<div class='alert alert-danger' role='alert'>Não existem Usuarios a serem exibidos</div>`
        }

    }).catch((erro) => {
        mensagem.innerHTML=`<div class='alert alert-danger' role='alert'> ${erro.message}</div>`
    })
}

function gravarUsuarioBackend(){
    let nome     = document.getElementById("nome").value;
    let cpf      = document.getElementById("cpf").value;
    let tipo     = document.getElementById("tipo").value;
    let endereco = document.getElementById("endereco").value;
    let cep      = document.getElementById("cep").value;
    let bairro   = document.getElementById("bairro").value;
    let cidade   = document.getElementById("cidade").value;
    let estado   = document.getElementById("estado").value;
    let telefone = document.getElementById("telefone").value;
    let email    = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem");
    fetch(urlBackEnd,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "nome": nome,
            "cpf":cpf,
            "tipo":tipo,
            "endereco":endereco,
            "cep":cep,
            "bairro":bairro,
            "cidade":cidade,
            "estado":estado,
            "telefone":telefone,
            "email":email,
        })
    }).then((resposta)=>{
        return resposta.json();
    }).then((dados)=>{
        if(dados.status){
            mensagem.innerHTML=`<div class="alert alert-success" role="alert">${dados.mensagem}</div>`
            limparTela()
            obterUsuarioBackend()
        }
        else{
            mensagem.innerHTML=`<div class="alert alert-danger" role="alert">${dados.mensagem}</div>`
        }
    }).catch((erro) =>{
        mensagem.innerHTML=`<div class="alert alert-warning" role="alert">${erro.message}</div>`
    })

}

function manipularSubmissaoDadosFormulario(evento){
    if (validarUsuario()){
        gravarUsuarioBackend();

    }
    evento.stopPropagation();
    evento.preventDefault();
}

function validarUsuario() {
    let nome     = document.getElementById("nome").value;
    let cpf      = document.getElementById("cpf").value;
    let tipo     = document.getElementById("tipo").value;
    let endereco = document.getElementById("endereco").value;
    let cep      = document.getElementById("cep").value;
    let bairro   = document.getElementById("bairro").value;
    let cidade   = document.getElementById("cidade").value;
    let estado   = document.getElementById("estado").value;
    let telefone = document.getElementById("telefone").value;
    let email    = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem");

    if (!nome){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, preencha nome completo </div>`

        return false;
    } else if (!cpf){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, informe CPF </div>`

        return false;
    }
    else if (!tipo){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, selecione o tipo </div>`

        return false;
    }
    else if (!endereco){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, preencha endereço </div>`

        return false;
    }
    else if (!cep){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, informe CEP </div>`

        return false;
    }
    else if (!bairro){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, preencha bairro </div>`

        return false;
    }
    else if (!cidade){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, preencha Cidade </div>`

        return false;
    }
    else if (!estado){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, selecione estado </div>`

        return false;
    }
    else if (!telefone){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, informe telefone </div>`

        return false;
    }
    else if (!email){
        mensagem.innerHTML= `<div class="alert alert-danger" role="alert"> Por favor, preencha e-mail </div>`

        return false;
    }
    mensagem.innerHTML = "";
    return true;

}

function selecionarRegistro(pnome="", pcpf="", ptipo="", pendereco = "", pcep="", pbairro="", pcidade="", pestado="", ptelefone="", pemail="", acao=""){
    let nome     = document.getElementById("nome");
    let cpf      = document.getElementById("cpf");
    let tipo     = document.getElementById("tipo");
    let endereco = document.getElementById("endereco");
    let cep      = document.getElementById("cep");
    let bairro   = document.getElementById("bairro");
    let cidade   = document.getElementById("cidade");
    let estado   = document.getElementById("estado");
    let telefone = document.getElementById("telefone");
    let email    = document.getElementById("email");
    nome.value = pnome;
    cpf.value = pcpf;
    tipo.value = ptipo;
    endereco.value = pendereco;
    cep.value = pcep;
    bairro.value = pbairro;
    cidade.value = pcidade
    estado.value = pestado;
    telefone.value = ptelefone;
    email.value = pemail;


    if (acao == 'excluir'){
        document.getElementById("cpf").disabled = true;
        let btnCadastro = document.getElementById("cadastrar");
        btnCadastro.disabled=true;
        let btnExcluir = document.getElementById("excluir")
        btnExcluir.disabled=false
        let btnAlterar = document.getElementById("atualizar")
        btnAlterar.disabled=true;
    } 
    else if (acao =='atualizar'){
        document.getElementById("cpf").disabled = true;
        let btnCadastro = document.getElementById("cadastrar");
        btnCadastro.disabled=true;
        let btnExcluir = document.getElementById("excluir")
        btnExcluir.disabled=true
        let btnAlterar = document.getElementById("atualizar")
        btnAlterar.disabled=false;
    }
    else{
        document.getElementById("cpf").disabled = false;
        let btnCadastro = document.getElementById("cadastrar");
        btnCadastro.disabled=false;
        let btnExcluir = document.getElementById("excluir")
        btnExcluir.disabled=true
        let btnAlterar = document.getElementById("atualizar")
        btnAlterar.disabled=true;
    }

}

function excluirUsuario(){
    
    if(confirm('Confirma a exclusão do usuario selecionado?')){
        fetch(urlBackEnd, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                cpf: document.getElementById("cpf").value
            })
        }).then((resposta) => {
            if (resposta.ok) return resposta.json();
        }).then((dados)=>{
            mensagem.innerHTML=`<div class="alert alert-success" role="alert"> ${dados.mensagem}</div>`;
            selecionarRegistro()
            limparTela()
            obterUsuarioBackend()
        }).catch((erro) => {
        mensagem.innerHTML=`<div class='alert alert-danger' role='alert'> ${erro.message}</div>`
        });
    }else{
        prepararTela();
    }
}

function atualizarUsuario(){
    if (confirm("Confirma a atualização do Usuario?")){
        let nome     = document.getElementById("nome").value;
        let cpf      = document.getElementById("cpf").value;
        let tipo     = document.getElementById("tipo").value;
        let endereco = document.getElementById("endereco").value;
        let cep      = document.getElementById("cep").value;
        let bairro   = document.getElementById("bairro").value;
        let cidade   = document.getElementById("cidade").value;
        let estado   = document.getElementById("estado").value;
        let telefone = document.getElementById("telefone").value;
        let email    = document.getElementById("email").value;
        let mensagem = document.getElementById("mensagem");
    
        fetch(urlBackEnd, { 
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "nome": nome,
                "cpf":cpf,
                "tipo":tipo,
                "endereco":endereco,
                "cep":cep,
                "bairro":bairro,
                "cidade":cidade,
                "estado":estado,
                "telefone":telefone,
                "email":email,
            })
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados) =>{
            if(dados.status){
                
                mensagem.innerHTML=`<div class="alert alert-success" role="alert"> ${dados.mensagem}</div>`;
                limparTela();
                obterUsuarioBackend()
            }
            else{
                mensagem.innerHTML=`<div class='alert alert-danger' role='alert'> ${dados.mensagem}</div>`
            }
        }).catch((erro) => {
            mensagem.innerHTML=`<div class='alert alert-danger' role='alert'> ${erro.message}</div>`
        }) 
    }
    else{
        prepararTela();
    }

}


obterUsuarioBackend();