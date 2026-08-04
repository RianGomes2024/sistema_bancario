import express from"express"
import validacao from"../middleware/Validacao.js"
import controller from"../controller/controllerCliente.js"
const router=express.Router()


router.post("/user",validacao.validyCampos(["cpf","nome","email","senha"]),controller.createUser)
router.get("/search",controller.getByUserCpf)
router.get("/user",controller.getByUsers)
router.delete("/user",controller.deleteUser)
router.patch("/user",controller.updateUser)
router.get("/transacao",controller.getTransationUser)
router.get("/login",controller.login)


export default{router}
