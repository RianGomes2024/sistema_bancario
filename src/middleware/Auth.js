

const autenticar=((req,res,next)=>{
    const gerar=req.headers.Authorization
    if(!token)throw new Error("Token não informado");
    const token=gerar.s
    
})