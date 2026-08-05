const validyCampos = (camposObrigatorios)=>{

    return (req,res,next)=>{
        const dados=req.body
        for(let campos of camposObrigatorios){
            
          if(dados[campos]===undefined||dados[campos]===null|| typeof dados[campos]==="string" && dados[campos].trim()==="")
            return res.status(400).json({message:`O campo ${campos} está vazio !`});
        }    
           next()
    }  
};


const validyFormatos=(req,res,next)=>{
    const email=req.body.email
    const senha=req.body.senha
    const cpf=req.body.cpf.toString()
    const telefone=req.body.telefone.toString()

    if(!email.endsWith("@gmail.com") && !email.endsWith("@outlook.com") && !email.endsWith("@hotmail.com")){
        return res.status(400).json({message:"Formato de e-mail inválido"});
    }
    if(cpf.length!==11){
        return res.status(400).json({message:"ERRO! Insira um CPF válido!!"});
    }
    if(senha.length<8 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)){ 
        return res.status(400).json({message:"ERRO! A senha deve conter no minimo 8 caracteres , ao menos 1 letra maiúscula e 1 número!"});
    }
    if(telefone.length!==11) {
        return res.status(400).json({message:"ERRO! Formato inválido de telefone (DDDXxxxxxxxx)"});
    }
    next()
}
export default {validyCampos,validyFormatos}