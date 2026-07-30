class Conta{
    constructor(numero_conta,id_cliente,saldo){
        this.numero_conta=numero_conta,
        this.id_cliente=id_cliente,
        this.saldo=saldo
    }
    sacar(valor){
        if(valor<this.saldo)throw new Error("Saldo Insuficiente!");
        const atualizar=this.saldo-=valor
        this.saldo=atualizar
    }
    depositar(valor){
        if(valor===0)throw new Error("Insira um valor válido");
        const atualizar=this.saldo+=valor
        this.saldo=atualizar
    }
}

return Conta