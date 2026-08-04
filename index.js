import RotasCliente from"./src/routes/RotasCliente.js"
import RotasConta from "./src/routes/RotasConta.js"
import RotasTransacao from "./src/routes/RotasTransacoes.js"
import express, { json } from"express"


const app=express()
app.use(json())
app.use(RotasCliente.router)
app.use(RotasConta.router)
app.use(RotasTransacao.router)
const porta=3001

app.listen(porta,()=>{console.log(`Server rodando na porta ${porta}`)})

