
import jwt from"jsonwebtoken"

const autenticar=((req,res,next)=>{
   try{
    const gerar = req.headers.authorization;
    if(!gerar)throw new Error("ERRO! Usuário não autenticado!!");
    const [bearer,token]=gerar.split(" ")
    if(bearer !=="Bearer")throw new Error("ERRO na autenticação, tente novamente!!");
     const usuario=jwt.verify(token,process.env.SEGREDO)
     req.usuario=usuario
     next()
   }catch(error){
      return res.status(401).json({
            erro: error.message
   })}
    
})

export default {autenticar}