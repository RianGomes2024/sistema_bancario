import modelConta from "../model/modelConta.js";
import modelCliente from "../model/modelCliente.js";
import Conta from"../class/Conta.js";


const createConta=(async(id_cliente,cpf)=>{
    const verifyContas=(await modelConta.getContaByCpf(cpf))[0];
    const verifyClientes=(await modelCliente.getUserByCpf(cpf))[0];

    if(verifyContas!==undefined)throw new Error("ERRO! CPF já cadastrado!");
    if(verifyClientes===undefined)throw new Error("ERRO! Cliente precisa estar cadastrado na plataforma para abrir uma conta!");
    const numero_conta=Math.floor(Math.random()*(80000-1000)-1000)
    const contaCliente=new Conta(numero_conta,id_cliente)
    const conta=await modelConta.createConta(contaCliente)
    return conta
}) 

const getContaByCpf=(async(cpf)=>{
    const cliente=(await modelConta.getContaByCpf(cpf))[0]
    if(cliente===undefined)throw new Error("ERRO! Conta não encontrada!");
    return cliente
})

const getcontaByNumberConta=(async(numero_conta)=>{
    const conta=(await modelConta.getContaByNumberConta(numero_conta))[0];
    if(conta===undefined)throw new Error("ERRO! Conta não encontrada!");
    return conta;
})

const getByContas=(async()=>{
    const contas=(await modelConta.getByContas())[0]
    if(contas===undefined)throw new Error("ERRO! Não há contas cadastradas");
    return contas  
})

const deleteConta=(async(cpf)=>{
    const verifyConta=(await modelConta.getContaByCpf(cpf))[0]
    const saldo=verifyConta.saldo
    if(verifyConta===undefined)throw new Error("ERRO! Conta não encontrada!");
    if(saldo!==0)throw new Error("ERRO! Não é possivel deletar a conta com saldo disponivel!");
    const conta=await modelConta.deleteConta(cpf)
    return conta
})

export default{createConta,getContaByCpf,getcontaByNumberConta,getByContas,deleteConta}