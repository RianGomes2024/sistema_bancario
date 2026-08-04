class Conta{
    constructor(numero_conta,id_cliente,id_conta,saldo){
        this.numero_conta=numero_conta,
        this.id_cliente=id_cliente,
        this.id_conta=id_conta,
        this.saldo=saldo
    }
    sacar(valor){
        if(valor>this.saldo)throw new Error("Saldo Insuficiente!");
      this.saldo-=valor
      
    }
    depositar(valor){
        if(valor===0 || valor <0)throw new Error("Insira um valor válido");
      this.saldo+=valor
       
    }
   
}

export default Conta