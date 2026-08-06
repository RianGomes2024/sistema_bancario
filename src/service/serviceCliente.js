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
    const cliente=(await model.getUserByCpf(cpf))[0];
    if(cliente===undefined)throw new Error("ERRO! Usuário não encontrado");
    return cliente;
});

const getByUsers=(async()=>{
    const clientes=(await model.getUsers())[0];
    if(clientes===undefined)throw new Error("ERRO! Não usuários cadastrados");
    return clientes;
});


const deleteUser=(async(cpf)=>{
    const cliente=(await model.getUserByCpf(cpf))[0]
    const conta=(await modelConta.getContaByCpf(cpf))[0]
    if(cliente===undefined)throw new Error("ERRO! Usuário não encontrado");
    if(conta===undefined)throw new Error("ERRO! Existe uma conta bancária ativa com seu CPF, é necessário que delete a conta para depois deletar o usuário");
    const deletar=await model.deleteUser(cpf);
    return deletar;
});

const updateUser=(async(dados,cpf)=>{
    const alteraveis=["nome","email","senha","telefone"]
    if(cpf===undefined || cpf===null)throw new Error("È necessário informar o CPF, para realizar o update");
    
    const keys=[]
    const values=[]
    for(const campos in dados){
        if(!alteraveis.includes(campos))throw new Error("Campo não permitido para alteração");
    }
    for(let atributos in dados){
       keys.push(atributos+"=?")
       values.push(dados[atributos])        
    }
    const concatenar=keys.join(",")
    const update=await model.updateUser(concatenar,values,cpf)
    return update
});

const getTransationUser=(async(cpf)=>{
    const transacoes=(await model.getTransationsUser(cpf))[0]
    if(transacoes===undefined)throw new Error("Não há transações registradas com esse CPF!");
    return transacoes;
})

const login=(async(email,senha)=>{
    const auth=(await model.login(email))[0]
    console.log(auth)
    const id_cliente=auth.id_cliente
    const cpf=auth.cpf
    const senhaHash=auth.senha
    if(auth===undefined)throw new Error("ERRO! Usuário não encontrado!");
    const token=jwt.sign({id_cliente,cpf},process.env.SEGREDO,process.env.EXPIRACAO)
    const verifySenha=await bcrypt.compare(senha,senhaHash);
    if(!verifySenha)throw new Error("ERRO! Senha Incorreta!");
    return token    
})

export default{login,createUser,getByUserCpf,getByUsers,deleteUser,updateUser,getTransationUser}




