import express from 'express';
import session from 'express-session';
import validaLogin from './validarLogin/validaLogin.js';
import autenticadorLogin from './seguranca/autenticadorLogin.js';

const hostname = 'localhost'
const porta = 4000;

const app = express();

app.use(session({
    secret:"MinHaChavESecr3t4",
    resave: true,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60 * 30
    }
}));

app.use(express.urlencoded({extended:false}));

app.use("/login", validaLogin);

app.use(express.static('./publico')); 

app.use(autenticadorLogin, express.static('./protegido'));

app.listen(porta, hostname, () => {
    console.log('Servidor em execução em http://' + hostname + ':' + porta )
});