import modeltransacao from"../model/modelTransacoes.js"
import modelConta from"../model/modelConta.js"
import classTransation from"../class/Transacao.js"
import classConta from"../class/Conta.js"

const transferir=(async(dados)=>{
    const numero_conta=dados.numero_conta
    const valor=dados.valor
    const contaOrigem=await modelConta.getContaByCpf(cpf)
    const contaDestino=await modeltransacao.getContaByNumber(numero_conta) 
    if(contaDestino.length===0)throw new Error("Conta não encontrada!");
    if(contaOrigem.length===0)throw new Error("Conta não encontrada");
    
    const id_cliente_destino=contaDestino.id_cliente
    const saldoDestino=contaDestino.saldo
    const novaContaDestino=new classConta(numero_conta,id_cliente_destino,saldoDestino)
    novaContaDestino.depositar(valor)
   
    
    const novaContaOrigem=new classConta(contaOrigem.numero_conta,contaOrigem.id_cliente,contaOrigem.saldo)
    novaContaOrigem.sacar(valor)
    const classTransacao=new classTransation(contaOrigem.id_conta,contaDestino.id_conta,dados.tipo,dados.valor,dados.descricao)
    const transacao=await modeltransacao.createTransacao(novaContaOrigem,novaContaDestino,classTransacao)
    return transacao
})