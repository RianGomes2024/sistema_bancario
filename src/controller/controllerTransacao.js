import Transacao from"../service/serviceTransacao.js"


const transferir=(async(req,res)=>{
    try{ 
     const numero_conta=req.body.numero_conta
     const valor=req.body.valor
     const cpf=req.usuario.cpf
     const descricao=req.body.descricao
     const transferir=await Transacao.transferir(numero_conta,valor,cpf,descricao)
      return res.status(200).json({message:"Tranferencia realizado com sucesso!!"})
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})


const sacar=(async(req,res)=>{
    try{  
       const valor=req.body.valor
       const cpf=req.usuario.cpf
       const saque=await Transacao.sacar(valor,cpf)
       return res.status(200).json({message:"Saque realizado com sucesso!"})
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})
const depositar=(async(req,res)=>{
    try{  
       const valor=req.body.valor
       const cpf=req.usuario.cpf
       const saque=await Transacao.depositar(valor,cpf)
       return res.status(200).json({message:"Deposito realizado com sucesso!"})
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

export default{sacar,depositar,transferir}