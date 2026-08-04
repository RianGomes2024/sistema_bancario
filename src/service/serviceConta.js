import modelConta from "../model/modelConta.js";
import modelCliente from "../model/modelCliente.js";
import Conta from"../class/Conta.js";


const createConta=(async(dados,id_cliente,cpf)=>{
    const verifyContas=await modelConta.getContaByCpf(cpf);
    const verifyClientes=await modelCliente.getUserByCpf(cpf);
    if(verifyContas.length>=1)throw new Error("ERRO! CPF já cadastrado!");
    if(verifyClientes.length===0)throw new Error("ERRO! Cliente precisa estar cadastrado na plataforma para abrir uma conta!");
    const numero_conta=Math.floor(Math.random()*(80000-1000)-1000)
    console.log(numero_conta)
    console.log(id_cliente)
    const contaCliente=new Conta(numero_conta,id_cliente)
    console.log(contaCliente)
    const conta=await modelConta.createConta(contaCliente)
    return conta
}) 

const getContaByCpf=(async(cpf)=>{
    const cliente=await modelConta.getContaByCpf(cpf)
    if(cliente.length===0)throw new Error("ERRO! Conta não encontrada!");
    return cliente
})

const getcontaByNumberConta=(async(numero_conta)=>{
    const conta=await modelConta.getContaByNumberConta(numero_conta);
    if(conta.length===0)throw new Error("ERRO! Conta não encontrada!");
    return conta;
})

const getByContas=(async()=>{
    const contas=await modelConta.getByContas()
    if(contas.length===0)throw new Error("ERRO! Não há contas cadastradas");
    return contas  
})

const deleteConta=(async(cpf)=>{
    const conta=await modelConta.deleteConta(cpf)
    const verifyConta=await modelConta.getContaByCpf(cpf)
    const saldo=verifyConta.saldo
    if(conta.length===0)throw new Error("ERRO! Conta não encontrada!");
    if(saldo!==0)throw new Error("ERRO! Não é possivel deletar a conta com saldo disponivel!");
    return conta
})

export default{createConta,getContaByCpf,getcontaByNumberConta,getByContas,deleteConta}