const validyCampos = (camposObrigatorios)=>{
    return (req,res,next)=>{
        const dados=req.body
        for(let campos of camposObrigatorios){
            if(
                dados[campos]===undefined||
                dados[campos]===null||
                typeof dados[campos]==="string" && dados[campos].trim()===""
            ) return res.status(400).json({message:`O campo ${campos} está vazio !`});
        }    
    } 
     next()
};
export default validyCampos