import banco from "../database/Conexao.js"

const Transferir=(async(novaContaOrigem,novaContaDestino,classTransacao)=>{
   
   console.log(classTransacao)
   
    try{
    await banco.beginTransaction;
   await banco.query(
    `update conta set saldo=? where id_conta=?`,
     [novaContaOrigem.saldo,novaContaOrigem.id_conta]
   )
   await banco.query(
    `update conta set saldo=? where id_conta=?`,
     [novaContaDestino.saldo,novaContaDestino.id_conta]
   )
   const [resultado]=await banco.query(
    `insert into transacoes (id_conta_origem,id_conta_destino,valor,descricao) VALUES(?,?,?,?)`,
     [classTransacao.id_conta_origem,classTransacao.id_conta_destino,classTransacao.valor,classTransacao.descricao]
   )
   await banco.commit
   return resultado
}catch(err){
    await banco.rollback
    throw err;
}finally{
    banco.releaseConnection
}
})

const getContaByNumber=(async(numero_conta)=>{
    const sql=`select id_conta,id_cliente,saldo
               from Conta
               join transacoes on Conta.id_conta=transacoes.id_conta_destino
               where conta.numero_conta=?`
               const conta=await banco.query(sql,[numero_conta])
               return conta
})


const sacar=(async(valor,id_conta)=>{
      const sql=`update conta set saldo=${valor} where id_conta=?`
      const conta=await banco.query(sql,[id_conta])
      return conta
})

const depositar=(async(valor,id_conta)=>{
      const sql=`update conta set saldo=${valor} where id_conta=?`
      const conta=await banco.query(sql,[id_conta])
      return conta
})


export default{Transferir, getContaByNumber,sacar,depositar}