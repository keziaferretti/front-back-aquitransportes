import Usuario from "../Modelo/Usuario.js";
import conectar from "./Conexao.js";
export default class UsuarioBD{

    async adicionar(usuario){

        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "INSERT INTO usuario(cpf,nome,tipo,cep,endereco,bairro,cidade,estado,telefone,email)\
                                            VALUES(?,?,?,?,?,?,?,?,?,?)";
            const valores = [usuario.cpf,usuario.nome,usuario.tipo,usuario.cep,usuario.endereco,usuario.bairro,
                                usuario.cidade,usuario.estado,usuario.telefone,usuario.email];
            await conexao.query(sql,valores);
        }

    }

    async alterar(usuario){

        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "UPDATE usuario SET nome=?,tipo=?,cep=?,endereco=?,bairro=?,cidade=?,estado=?,\
                                            telefone=?,email=? WHERE cpf=?";
            const valores = [usuario.nome,usuario.tipo,usuario.cep,usuario.endereco,usuario.bairro,
                                usuario.cidade,usuario.estado,usuario.telefone,usuario.email,usuario.cpf];
            await conexao.query(sql,valores);
        }

    }

    async excluir(usuario){
        
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "DELETE FROM usuario WHERE cpf=?";
            const valores = [usuario.cpf];
            await conexao.query(sql,valores);
        }

    }

    async consultar(termo){

        const conexao = await conectar();
        const sql = "SELECT * FROM usuario WHERE nome LIKE ?";
        const valores = ['%'+termo+'%']
        const [rows] = await conexao.query(sql,valores);
        const listaUsuarios = [];
        for(const row of rows){
            const usuario = new Usuario(row['cpf'],row['nome'],row['tipo'],row['cep'],row['endereco'],
                            row['bairro'],row['cidade'],row['estado'],row['telefone'],row['email']);
            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }

    async consultarCPF(cpf){
        
        const conexao = await conectar();
        const sql = "SELECT * FROM usuario WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql,valores);
        const listaUsuarios = [];
        for(const row of rows){
            const usuario = new Usuario(row['cpf'],row['nome'],row['tipo'],row['cep'],row['endereco'],
                            row['bairro'],row['cidade'],row['estado'],row['telefone'],row['email']);
            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }
}