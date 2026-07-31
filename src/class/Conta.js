class Conta{
    constructor(numero_conta,id_cliente){
        this.numero_conta=numero_conta,
        this.id_cliente=id_cliente
    }
    sacar(valor,saldo){
        if(valor<saldo)throw new Error("Saldo Insuficiente!");
        const atualizar=this.saldo-=valor
        saldo=atualizar
    }
    depositar(valor,saldo){
        if(valor===0)throw new Error("Insira um valor válido");
        const atualizar=saldo+=valor
        saldo=atualizar
    }
}

return Conta