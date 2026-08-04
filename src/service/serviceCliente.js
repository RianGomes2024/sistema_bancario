import Cliente from "../class/Cliente.js";
import model from"../model/modelCliente.js";
import modelConta from"../model/modelConta.js"
import jwt from "jsonwebtoken";
import bcrypt from"bcrypt"


const createUser=(async(dados)=>{
    const verifyUser=await model.getUsersDados(dados.cpf,dados.email,dados.telefone);
    if(verifyUser===undefined){
    const senha=await bcrypt.hash(dados.senha,10)
    dados.senha=senha
    const cliente=new Cliente(dados);
    const result=await model.createUser(cliente);
    return result;
    } 
    const cpf=verifyUser.cpf
    const parseString=dados.cpf.toString()
    if(parseString===cpf)throw new Error("ERRO! CPF já cadastrado!");
    if(verifyUser.email===dados.email)throw new Error("ERRO! E-mail já cadastrado!");
    if(verifyUser.telefone===dados.telefone)throw new Error("ERRO! Telefone já cadastrado!");
    
});

const getByUserCpf=(async(cpf)=>{
    console.log(cpf)
    const cliente=await model.getUserByCpf(cpf);
    if(cliente.length===0)throw new Error("ERRO! Usuário não encontrado");
    return cliente;
});

const getByUsers=(async()=>{
    const clientes=await model.getUsers();
    if(clientes.length===0)throw new Error("ERRO! Não usuários cadastrados");
    return clientes;
});


const deleteUser=(async(cpf)=>{
    const cliente=await model.deleteUser(cpf);
    const conta=await modelConta.getContaByCpf(cpf)
    if(cliente.length===0)throw new Error("ERRO! Usuário não encontrado");
    if(conta.length>=1)throw new Error("ERRO! Existe uma conta bancária ativa com seu CPF, é necessário que delete a conta para deposi deletar o usuário");
    return cliente;
});

const updateUser=(async(dados)=>{
    const alteraveis=["nome","email","senha","telefone"]
    const cpf=dados.cpf
    if(cpf===undefined || cpf===null)throw new Error("È necessário informar o CPF, para realizar o update");
    
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
    const id_cliente=auth.id_cliente
    const cpf=auth.cpf
    const senhaHash=auth.senha
    if(auth.length===0)throw new Error("ERRO! Usuário não encontrado!");
    const token=jwt.sign({id_cliente,cpf},process.env.SEGREDO,process.env.EXPIRACAO)
    console.log(senha)
    console.log(senhaHash)
    const verifySenha=await bcrypt.compare(senha,senhaHash);
    if(!verifySenha)throw new Error("ERRO! Senha Incorreta!");
    return token    
})

export default{login,createUser,getByUserCpf,getByUsers,deleteUser,updateUser,getTransationUser}




