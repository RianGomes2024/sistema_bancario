import banco from "../database/Conexao.js"

const Transferir=(async(novaContaOrigem,novaContaDestino,classTransacao,tipo)=>{
    console.log(novaContaDestino)
    console.log(novaContaOrigem)
    console.log(classTransacao)
    try{
        await banco.beginTransaction;
        await banco.query(`update conta set saldo=? where id_conta=?`,
        [novaContaOrigem.saldo,classTransacao.id_conta_origem]
)
        await banco.query(
        `update conta set saldo=? where id_conta=?`,
        [novaContaDestino.saldo,classTransacao.id_conta_destino]
)
        const [resultado]=await banco.query(
        `insert into transacoes (id_conta_origem,id_conta_destino,valor,descricao,tipo) VALUES(?,?,?,?,?)`,
        [classTransacao.id_conta_origem,classTransacao.id_conta_destino,classTransacao.valor,classTransacao.descricao,tipo]
)
       await banco.commit
       return resultado
}
    catch(err){
       await banco.rollback
       throw err;
}   
    finally{
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


const sacar=(async(classTransacao,newSaldo)=>{
    console.log(classTransacao)
    console.log(newSaldo)
    try{
        await banco.beginTransaction
        await banco.query(
        `update conta set saldo=${newSaldo} where id_conta=?`,
        [classTransacao.id_conta_origem]
)
        const [resultado]=await banco.query(
        `insert into transacoes(id_conta_origem,id_conta_destino,valor,descricao,tipo) VALUES(?,?,?,?,?)`,
        [classTransacao.id_conta_origem,null,classTransacao.valor,classTransacao.descricao,classTransacao.tipo]
)
        await banco.commit
        return resultado
}
    catch(err){
        await banco.rollback
        throw err;
}
    finally{
        banco.releaseConnection
}
})

const depositar=(async(classTransacao,newSaldo)=>{
    try{  
         await banco.beginTransaction
         await banco.query(`update conta set saldo=${newSaldo} where id_conta=?`,
         [classTransacao.id_conta_destino]
)
         const [resultado]=await banco.query(`insert into transacoes(id_conta_origem,id_conta_destino,valor,descricao,tipo) VALUES(?,?,?,?,?)`,
         [null,classTransacao.id_conta_destino,classTransacao.valor,classTransacao.descricao,classTransacao.tipo]
)
         await banco.commit
         return resultado
}
         catch(err){
         await banco.rollback
         throw err;
}
    finally{
         banco.releaseConnection
}
})


export default{Transferir, getContaByNumber,sacar,depositar}