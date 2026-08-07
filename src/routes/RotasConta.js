import express from"express"
import Auth from "../middleware/Auth.js"
import validacao from"../middleware/Validacao.js"
import controllerConta from"../controller/controllerConta.js"
import controllerCliente from"../controller/controllerCliente.js"
const router=express.Router()


router.post("/conta",Auth.autenticar,controllerConta.createConta)
router.get("/search/cpf",Auth.autenticar,controllerConta.getContaByCpf)
router.get("/search/conta",Auth.autenticar,controllerConta.getContaByNumberConta)
router.get("/conta",Auth.autenticar,controllerConta.getByContas)
router.patch("/desativar",Auth.autenticar,controllerConta.desativarConta)
router.patch("/ativar",Auth.autenticar,controllerConta.ativarConta)


export default{router}
