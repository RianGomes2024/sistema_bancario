import Cliente from "../class/Cliente.js";
import model from"../model/modelCliente.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const createUser=(async(dados)=>{
    const verifyUser=await model.getUsersDados(dados.cpf,dados.email,dados.telefone);
    if(verifyUser.cpf===dados.cpf)throw new Error("ERRO! CPF já cadastrado!");
    if(verifyUser.email===dados.email)throw new Error("ERRO! E-mail já cadastrado!");
    if(verifyUser.telefone===dados.telefone)throw new Error("ERRO! Telefone já cadastrado!");
    const cliente=new Cliente(dados);
    const result=await model.createUser(cliente);
    return result;
});

const getByUserCpf=(async(cpf)=>{
    const cliente=await model.getUserByCpf(cpf);
    if(cliente.length===0)throw new Error("ERRO! Usuário não encontrado");
    return cliente;
});

const getByUsers=(async()=>{
    const clientes=await model.getUsers();
    if(clientes.length===0)throw new Error("ERRO! Não usuários cadastrados");
    return cliente;
});


const deleteUser=(async(cpf)=>{
    const cliente=await model.deleteUser(cpf);
    if(cliente.length===0)throw new Error("ERRO! Usuário não encontrado");
    return cliente;
});

const updateUser=(async(dados)=>{
    const alteraveis=["nome","email","senha","telefone"]
    const cpf=dados.cpf
    const keys=[]
    const values=[]
    for(const campos in dados){
        if(!alteraveis.includes(campos))throw new Error("Campo não permitido para alteração");
    }
    for(let atributos in dados){
       keys.push(dados+"?")
       values.push(dados[atributos])        
    }
    const concatenar=keys.join(",")
    const update=await model.updateUser(concatenar,valores,cpf)
});

const getTransationUser=(async(cpf)=>{
    const transacoes=await model.getTransationsUser(cpf)
    if(transacoes.length===0)throw new Error("Não há transações registradas com esse CPF!");
    return transacoes;
})

const login=(async(email,senha)=>{
    const auth=await model.login(email)
    const senhaHash=auth.senha
    if(auth.length===0)throw new Error("Usuário não encontrado!");
    const token=jwt.sign({id_cliente},process.env.SEGREDO,)
    if(senhaHash!=senha)throw new Error("Senha incorreta!");

    
    
})

export default{createUser,getByUserCpf,getByUsers,deleteUser,updateUser,getTransationUser}




