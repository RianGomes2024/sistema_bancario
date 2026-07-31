import banco from "../database/Conexao.js"

const createTransacao=(async(novaContaOrigem,novaContaDestino,classTransacao)=>{
   await banco.beginTransaction();
   await banco.query(
    `update conta set saldo=? where id_conta=?`
     [novaContaOrigem.saldo,novaContaOrigem.id_conta]
   )
   await banco.query(
    `update conta set saldo=? where id_conta=?`
     [novaContaDestino.saldo,novaContaDestino.id_conta]
   )
   await banco.query(
    `insert into transacoes (id_conta_origem,id_conta_destino,tipo,valor,descricao) VALUES(?,?,?,?,?)`
     [classTransacao.id_conta_origem,classTransacao.id_conta_destino,classTransacao.tipo,classTransacao.valor,classTransacao.descricao]
   )
})

const getContaByNumber=(async(numero_conta)=>{
    const sql=`select id_conta,id_cliente,saldo
               from Conta
               join transacoes on Conta.id_conta=transacoes.id_conta_destino
               where conta.numero_conta=?`
               const conta=await banco.query(sql,[numero_conta])
               return conta
})


export default{createTransacao , getContaByNumber}