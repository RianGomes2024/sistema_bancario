class Conta{
    constructor(numero_conta,id_cliente,saldo){
        this.numero_conta=numero_conta,
        this.id_cliente=id_cliente,
        this.saldo=saldo
    }
    sacar(valor){
      console.log(this)
      console.log(valor)
        if(valor>this.saldo)throw new Error("Saldo Insuficiente!");
        
        this.saldo-=valor
      
    }
    depositar(valor){
        if(valor===0 || valor <0)throw new Error("Insira um valor válido");
      this.saldo+=valor
       
    }
   
}

export default Conta