import { Router } from "express";

const validaLogin = new Router();

validaLogin.get('/', (requisicao, resposta) => {
    resposta.redirect("/login.html")
})

.post('/', (requisicao, resposta) => {

   const usuario =  requisicao.body.usuario;
   const senha = requisicao.body.senha; 
   if (usuario && senha && usuario === 'admin' && senha ==='admin123'){
    requisicao.session.usuarioLogado=true;
    resposta.redirect('/cadastroUsuario.html');
   } 
   else {
    resposta.send(`
    <div style="border: 2px solid #FFA07A;
        border-radius: 10px;
        background-color: #F5F5F5;
        padding: 20px;
        margin: 50px auto;
        max-width: 500px;
        text-align: center;">
        <h2 style="font-weight: bold; 
        font-size: 2em;">Falha no Login!</h2>
        <p style="font-size: 1.2em;">Usuário ou senha invalido.</p>
        <button style='background-color: #FFA07A;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-weight: bold;
        padding: 10px 20px;
        margin-top: 20px;
        cursor: pointer' 
        onclick='history.back()'>Voltar</button>
    </div>
  `);}
     
});

export default validaLogin;