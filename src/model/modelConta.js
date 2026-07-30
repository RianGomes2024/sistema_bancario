import banco from"../database/Conexao.js"


const createConta=(async(dados)=>{
    const {id_cliente,saldo}=dados;
    const sql="INSERT INTO Conta (numero_conta,id_cliente) VALUES(?)";
    const conta=await banco.query(sql,[numero_conta,id_cliente,saldo]);
    return conta;
});


const getContaByCpf=(async(cpf)=>{
    const sql=`select numero_conta,saldo from Conta
               join cliente on Conta.id_cliente=Cliente.id_cliente
               where Cliente.cpf=?`;
    const [conta]=await banco.query(sql,[cpf]);
    return conta;
});

const getContaByNumberConta=(async(numero_conta)=>{
    const sql=`select id_cliente,saldo from conta where numero_conta=?`;
    const [conta]=await banco.query(sql,[numero_conta]);
    return conta;
});


const getByContas=(async()=>{
    const sql="select*from Conta"
    const [contas]=await banco.query(sql);
    return conta;
})

const deleteConta=(async(cpf)=>{
    const sql=`delete conta
               from conta
               join cliente on cliente.id_cliente=conta.id_cliente
               where cpf=?`;
    const deletar=await banco.query(sql,[cpf])     
    return deletar      
});



export default{createConta,deleteConta,getByContas,getContaByCpf,getContaByNumberConta}


