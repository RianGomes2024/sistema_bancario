
import banco from"../database/Conexao.js"

const createUser=(async(dados)=>{
    const {cpf,nome,email,senha,telefone}=dados;
    const sql="INSERT INTO Cliente(cpf,nome,email,senha,telefone,status_conta) VALUES (?,?,?,?,?)";
    const [user]=await banco.query(sql,[cpf,nome,email,senha,telefone]);
    return user;
});

const getUserByCpf=(async(cpf)=>{
    const sql=`SELECT id_cliente,
    cpf,
    nome,
    email,
    senha,
    telefone,
    status_usuario,
    DATE_FORMAT(data_criacao, '%Y-%m-%d %H:%i:%s') AS data_criacao 
    from Cliente WHERE cpf=?`;
    const [user]=await banco.query(sql,[cpf]);
    return user;
});
const getUsersDados=(async(cpf,email,telefone)=>{
    const sql=`SELECT id_cliente,
    cpf,
    nome,
    email,
    senha,
    telefone,
    DATE_FORMAT(data_criacao, '%Y-%m-%d %H:%i:%s') AS data_criacao from Cliente WHERE cpf=? or email=? or telefone=?`;
    const [user]=await banco.query(sql,[cpf,email,telefone]);

    return user;
});

const getUsers=(async()=>{
    const sql=`select id_cliente,
    cpf,
    nome,
    email,
    senha,
    telefone,
    DATE_FORMAT(data_criacao, '%Y-%m-%d %H:%i:%s') AS data_criacao
    from cliente`;
    const [user]=await banco.query(sql);
    console.log(user)
    return user;
});

const deleteUser=(async(cpf)=>{
    const sql=`update cliente set status_usuario="Encerrada" where cpf=?`;
    const user=await banco.query(sql,[cpf]);
    return user;
});

const ativarUser=(async(cpf)=>{
    const sql=`update cliente set status_usuario="ativa" where cpf=?`;
    const user=await banco.query(sql,[cpf]);
    return user;
});

const updateUser=(async(campos,valores,cpf)=>{
    const sql=`UPDATE Cliente SET ${campos} WHERE cpf=?`;
    const user=await banco.query(sql,[valores,cpf]);
    return user;
});

const getTransationsUser=(async(cpf)=>{
     const sql=`select transacoes.* from transacoes 
    left join Conta as contaOrigem on transacoes.id_conta_origem=contaOrigem.id_conta
    left join Conta as contaDestino on transacoes.id_conta_destino=contaDestino.id_conta 
	join Cliente on contaOrigem.id_cliente=Cliente.id_cliente
    or contaDestino.id_cliente=Cliente.id_cliente
 where Cliente.cpf=32165498765;`;
    const [transations]=await banco.query(sql,[cpf])
    return transations
})


const login=(async(email)=>{
    const sql="select*from cliente where email=?"
    const [cliente]=await banco.query(sql,[email])
    return cliente
})
export default{login,createUser,getUserByCpf,getUsers,deleteUser,updateUser,getTransationsUser,getUsersDados,ativarUser}