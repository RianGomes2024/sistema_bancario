import banco from"../database/Conexao.js"


const createConta=(async(dados)=>{
    const {numero_conta,id_cliente,id_conta}=dados
    const sql="INSERT INTO Conta (numero_conta,id_cliente) VALUES(?,?)";
    const conta=await banco.query(sql,[numero_conta,id_cliente]);
    return conta;
});


const getContaByCpf=(async(cpf)=>{
    const sql=`select id_conta,numero_conta,saldo, Conta.id_cliente, conta.status_conta from Conta
               join cliente on Conta.id_cliente=Cliente.id_cliente
               where Cliente.cpf=?`;
    const [conta]=await banco.query(sql,[cpf]);
    return conta;
});

const getContaByNumberConta=(async(numero_conta)=>{
    const sql=`select id_cliente,saldo,id_conta from conta where numero_conta=?`;
    const [conta]=await banco.query(sql,[numero_conta]);
    return conta;
});


const getByContas=(async()=>{
    const sql="select*from Conta"
    const [conta]=await banco.query(sql);
    console.log(conta)
    return conta;
})

const desativarConta=(async(cpf)=>{
    const sql=`UPDATE conta
              join cliente on conta.id_cliente=cliente.id_cliente
              set status_conta="desativada"
              where cliente.cpf=?`;
    const desativar=await banco.query(sql,[cpf])     
    return desativar     
});

const ativarConta=(async(cpf)=>{
    const sql=`UPDATE conta
              join cliente on conta.id_cliente=cliente.id_cliente
              set status_conta="ativa"
              where cliente.cpf=?`;
    const ativar=await banco.query(sql,[cpf])     
    return ativar     
});




export default{createConta,desativarConta,getByContas,getContaByCpf,getContaByNumberConta,ativarConta}


