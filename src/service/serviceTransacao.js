import modeltransacao from"../model/modelTransacoes.js"
import modelConta from"../model/modelConta.js"
import classTransation from"../class/Transacao.js"
import classConta from"../class/Conta.js"

const transferir=(async(numero_conta,valor,cpf,descricao)=>{
    const contaOrigem=(await modelConta.getContaByCpf(cpf))[0]
    const contaDestino=(await modelConta.getContaByNumberConta(numero_conta))[0] 

    if(contaDestino===undefined)throw new Error("Conta destino não encontrada!");
    if(contaOrigem===undefined)throw new Error("Conta origem não encontrada");
    
    const id_conta_origem=contaOrigem.id_conta
    const id_cliente_origem=contaOrigem.id_cliente
    const saldoOrigem=Number(contaOrigem.saldo)
    const novaContaOrigem=new classConta(numero_conta,id_cliente_origem,id_conta_origem,saldoOrigem)
    novaContaOrigem.sacar(valor)
    
    const id_conta_destino=contaDestino.id_conta
    if(id_conta_origem===id_conta_destino)throw new Error("ERRO! Não é possivel transferir para mesma conta!!");
    const id_cliente_destino=contaDestino.id_cliente
    const saldoDestino=Number(contaDestino.saldo)
    const novaContaDestino=new classConta(numero_conta,id_cliente_destino,id_conta_destino,saldoDestino)
    novaContaDestino.depositar(valor)
    const classTransacao=new classTransation(id_conta_origem,id_conta_destino,valor,descricao)
    const transacao=await modeltransacao.Transferir(novaContaOrigem,novaContaDestino,classTransacao)
    return transacao
})



const sacar=(async(valor,cpf)=>{
    const verifyConta=(await modelConta.getContaByCpf(cpf))[0]
    if(verifyConta===undefined)throw new Error("Conta não encontrada");
    const id_conta=verifyConta.id_conta
    const id_cliente=verifyConta.id_cliente
    let saldo=Number(verifyConta.saldo)
    const numero_conta=verifyConta.numero_conta    
    const conta=new classConta(numero_conta,id_cliente,id_conta,saldo)
    const newSaldo=saldo-=valor
    const saque=await modeltransacao.sacar(newSaldo,id_conta)
    return saque

})


const depositar=(async(valor,cpf)=>{
    const verifyConta=(await modelConta.getContaByCpf(cpf))[0]
    if(verifyConta===undefined)throw new Error("Conta não encontrada");
    const id_conta=verifyConta.id_conta
    const id_cliente=verifyConta.id_cliente
    let saldo=Number(verifyConta.saldo)
    const numero_conta=verifyConta.numero_conta    
    const conta=new classConta(numero_conta,id_cliente,id_conta,saldo)
    conta.depositar(valor)
    const newSaldo=saldo+=valor
    const deposito=await modeltransacao.depositar(newSaldo,id_conta)
    return deposito
})


export default{sacar,depositar,transferir}