import express from 'express';
import rotaUsuario from './Rotas/rotaUsuario.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use('/usuarios', rotaUsuario);

app.listen(3006,'localhost', ()=>{
    console.log("Biblioteca ouvindo em http://localhost:3006")
});