import modelConta from "../model/modelConta";
import modelCliente from "../model/modelCliente.js";
import conta from"../class/Conta.js";


const createConta=(async(dados)=>{
    const cpf=dados.cpf
    const verifyContas=await modelConta.getContaByCpf(cpf);
    const verifyClientes=await modelCliente.getUserByCpf(cpf);
    if(verifyContas.length>=1)throw new Error("ERRO! CPF já cadastrado!");
    if(verifyClientes.length===0)throw new Error("ERRO! Cliente precisa estar cadastrado na plataforma para abrir uma conta!");
    const numero_conta=Math.floor(Math.random()*(80000-1000)-1000)
    const conta=await modelConta.createConta()
    

    
}) 