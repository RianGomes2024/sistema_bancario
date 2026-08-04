
import banco from"../database/Conexao.js"

const createUser=(async(dados)=>{
    const {cpf,nome,email,senha,telefone}=dados;
    const sql="INSERT INTO Cliente(cpf,nome,email,senha,telefone) VALUES (?,?,?,?,?)";
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
    const indice0=user[0]
    return indice0;
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
    const sql="DELETE FROM Cliente WHERE cpf=?";
    const user=await banco.query(sql,[cpf]);
    return user;
});

const updateUser=(async(campos,valores,cpf)=>{
    const sql=`UPDATE Cliente SET ${campos} WHERE cpf=?`;
    const user=await banco.query(sql,[valores,cpf]);
    return user;
});

const getTransationsUser=(async(cpf)=>{
     const sql=`select*from transacoes 
    join Conta as contas on transacoes.id_conta_origem=contas.id_conta
    join Conta on transacoes.id_conta_destino=contas.id_conta 
    join Cliente on contas.id_cliente=Cliente.id_cliente
    where Cliente.cpf=12345687`;
    const [transations]=await banco.query(sql,[cpf])
    return transations
})


const login=(async(email)=>{
    const sql="select*from cliente where email=?"
    const [cliente]=await banco.query(sql,[email])
    const indice0=cliente[0]
    return indice0
})
export default{login,createUser,getUserByCpf,getUsers,deleteUser,updateUser,getTransationsUser,getUsersDados}