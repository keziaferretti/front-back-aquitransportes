import Usuario from "../Modelo/Usuario.js";

export default class UsuarioCTRL{

    gravar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const tipo = dados.tipo;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && tipo && cep && endereco && bairro && cidade && estado && telefone && email)
            {
                const usuario = new Usuario(cpf,nome,tipo,cep,endereco,bairro,cidade,estado,telefone,email);
                usuario.gravar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Usuário gravado com sucesso!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do usuário de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou usuário não fornecido em formato JSON!"
            });
        }
    }

    atualizar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const tipo = dados.tipo;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && tipo && cep && endereco && bairro && cidade && estado && telefone && email)
            {
                const usuario = new Usuario(cpf,nome,tipo,cep,endereco,bairro,cidade,estado,telefone,email);
                usuario.atualizar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Usuário atualizado com sucesso!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do usuário de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou usuário não fornecido em formato JSON!"
            });
        }
    }
    
    excluir(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf)
            {
                const usuario = new Usuario(cpf);
                usuario.removerDoBancoDeDados().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Usuário excluído com sucesso!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe cpf do usuário de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou usuário não fornecido em formato JSON!"
            });
        }
    }

    consultar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){
            const usuario = new Usuario();
            usuario.consultar('').then((usuarios)=>{
                    resposta.status(200).json(usuarios);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }  
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido!"
            });
        }
    }

    consultarPeloCPF(requisicao,resposta){
        resposta.type("application/json");

        const cpf = requisicao.params['cpf'];

        if(requisicao.method === "GET"){
            const usuario = new Usuario();
            usuario.consultarCPF(cpf).then((usuario)=>{
                    resposta.status(200).json(usuario);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }  
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido!"
            });
        }
    }
}