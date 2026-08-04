import rotasCliente from"./src/routes/RotasCliente.js"
import RotasConta from "./src/routes/RotasConta.js"
import express, { json } from"express"


const app=express()
app.use(json())
app.use(rotasCliente.router)
app.use(RotasConta.router)
const porta=3001

app.listen(porta,()=>{console.log(`Server rodando na porta ${porta}`)})

