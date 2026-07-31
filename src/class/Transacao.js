class Transacao{
    constructor(dados){
        this.id_conta_origem=dados.id_conta_origem,
        this.id_conta_destino=dados.id_conta_destino,
        this.tipo=dados.tipo,
        this.valor=dados.valor,
        this.decricao=dados.decricao
    }
     
}
export default Transacao