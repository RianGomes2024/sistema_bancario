import Cliente from "../class/Cliente.js";
import model from"../model/modelCliente.js";
import modelConta from"../model/modelConta.js"
import jwt from "jsonwebtoken";
import bcrypt from"bcrypt"
import modelCliente from "../model/modelCliente.js";


const createUser=(async(dados)=>{
    const verifyUser=(await model.getUsersDados(dados.cpf,dados.email,dados.telefone))[0];
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
    const clientes=(await model.getUsers());
    if(clientes.length===0)throw new Error("ERRO! Não usuários cadastrados");
    return clientes;
});


const deleteUser=(async(cpf)=>{
    const cliente=(await model.getUserByCpf(cpf))[0]
    const conta=(await modelConta.getContaByCpf(cpf))[0]
    if(cliente===undefined)throw new Error("ERRO! Usuário não encontrado");
    if(conta.status_conta==="ativada")throw new Error("ERRO! Existe uma conta bancária ativa com seu CPF, é necessário que desative a conta para depois deletar o usuário");
    if(cliente.status_usuario==="Encerrada")throw new Error("ERRO! A conta já se encontra encerrada!");
    const deletar=await model.deleteUser(cpf);
    return deletar;
});

const ativarUser=(async(cpf)=>{
    const cliente=(await model.getUserByCpf(cpf))[0]
    const statusUsuario="ativa"
    if(cliente===undefined)throw new Error("ERRO! Usuário não encontrado!");
    if(cliente.status_usuario==="ativa")throw new Error("ERRO! A conta já se encontra ativa!");
    const ativar=await model.ativarUser(cpf);
    return ativar;
});

const updateUser=(async(dados,cpf)=>{
    const conta=await modelCliente.getUsersDados(cpf)
    const alteraveis=["nome","email","senha","telefone"]
    if(cpf===undefined || cpf===null)throw new Error("È necessário informar o CPF, para realizar o update");
    const keys=[]
    const values=[]
    for(const campos in dados){
        if(!alteraveis.includes(campos))throw new Error(`ERRO! ${campos.toUpperCase()} não permitido para alteração`);
        if(campos==="telefone"){
            const parseNumero=dados[campos].toString()
            const verifyTelefone=await modelCliente.getUsersDados("","",dados[campos])
            if(parseNumero.length!==11)throw new Error("ERRO! Formato inválido de telefone (DDDXxxxxxxxx)");
            if(verifyTelefone.length>=1)throw new Error("ERRO! Telefone já cadastrado!");   
        }
        if(campos==="email"){
            const verifyEmail=await modelCliente.getUsersDados("",dados[campos],"")
            if(!dados[campos].endsWith("@gmail.com") && !dados[campos].endsWith("@outlook.com") && !dados[campos].endsWith("@hotmail.com"))
            throw new Error("Formato de e-mail inválido");
            if(verifyEmail.length>=1)throw new Error("ERRO! E-mail já cadastrado!");   
        }
        keys.push(campos+"=?")
        values.push(dados[campos])        
    }
    const concatenar=keys.join(",")
    const update=await model.updateUser(concatenar,values,cpf)
    return update
});

const getTransationUser=(async(cpf)=>{
    const transacoes=(await model.getTransationsUser(cpf))
    if(transacoes.length===0)throw new Error("Não há transações registradas com esse CPF!");
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

export default{login,createUser,getByUserCpf,getByUsers,deleteUser,updateUser,getTransationUser,ativarUser}




