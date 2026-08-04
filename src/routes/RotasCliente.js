import express from"express"
import validacao from"../middleware/Validacao.js"
import controller from"../controller/controllerCliente.js"
import Auth from "../middleware/Auth.js"
const router=express.Router()


router.post("/user",validacao.validyCampos(["cpf","nome","email","senha"]),controller.createUser)
router.get("/search",Auth.autenticar,controller.getByUserCpf)
router.get("/user",Auth.autenticar,controller.getByUsers)
router.delete("/user",Auth.autenticar,controller.deleteUser)
router.patch("/user",Auth.autenticar,controller.updateUser)
router.get("/transacao",Auth.autenticar,controller.getTransationUser)
router.get("/login",controller.login)


export default{router}
