
import serviceConta from "../service/serviceConta.js";

const createConta=(async(req,res)=>{
    try{

        const id_cliente=req.usuario.id_cliente
        const cpf=req.usuario.cpf
        const conta=await serviceConta.createConta(id_cliente,cpf)
        return res.status(201).json({message:"Conta cadastrada com sucesso!"});
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
}) 

const getContaByCpf=(async(req,res)=>{
    try{
        const cpf=req.usuario.cpf
        const conta=await serviceConta.getContaByCpf(cpf);
      return res.status(200).json(conta);
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

const getContaByNumberConta=(async(req,res)=>{
    try{
        const numero_conta=req.body.numero_conta
        const conta=await serviceConta.getcontaByNumberConta(numero_conta)
        return res.status(200).json(conta);
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

const getByContas=(async(req,res)=>{
    try{
        const conta=await serviceConta.getByContas()
        return res.status(200).json(conta);
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

const deleteConta=(async(req,res)=>{
    try{
    const cpf=req.usuario.cpf
    const conta=await serviceConta.deleteConta(cpf)
    return res.status(200).json({message:"Conta Deletada com sucesso!"});
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

export default{createConta,getByContas,getContaByCpf,getContaByNumberConta,deleteConta}