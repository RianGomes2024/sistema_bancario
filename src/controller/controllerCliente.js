import service from"../service/serviceCliente.js"

const createUser=(async(req,res)=>{
    try{
        const dados=req.body;
        const nome=dados.nome;
        const cliente=await service.createUser(dados);
        return res.status(201).json({message:`${nome} , foi cadastrado com sucesso!`});
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

const getByUserCpf=(async(req,res)=>{
    try{
        const cpf=req.usuario.cpf
        console.log(cpf)
        const cliente=await service.getByUserCpf(cpf);
        return res.status(200).json(cliente);
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

const getByUsers=(async(req,res)=>{
    try{
        const cliente=await service.getByUsers();
        return res.status(200).json(cliente);
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

const deleteUser=(async(req,res)=>{
     try{
        const cpf=req.usuario.cpf
        const cliente=await service.deleteUser(cpf);
        return res.status(200).json({message:"Usuário deletado com sucesso!"});
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})

const updateUser=(async(req,res)=>{
    try{
        const dados=req.body
        const cpf=req.usuario.cpf
        const update=await service.updateUser(dados,cpf);
        return res.status(200).json({message:"Dados atualizados com sucesso!!"});
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
});


const getTransationUser=(async(req,res)=>{
     try{
        const cpf=req.usuario.cpf
        const cliente=await service.getTransationUser(cpf);
        return res.status(200).json(cliente);
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})



const login=(async(req,res)=>{
    try{
        const email=req.body.email
        const senha=req.body.senha
        const logar=await service.login(email,senha);
        return res.status(200).json(`${email}, logado com sucesso! 
            \n ${logar}`);
    }catch(error){
        return res.status(400).json({erro:error.message})
    }
})


export default{createUser,deleteUser,getByUserCpf,getByUsers,getTransationUser,login,updateUser}