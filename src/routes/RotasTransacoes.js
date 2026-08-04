import controller from "../controller/controllerTransacao.js"
import Auth from "../middleware/Auth.js"
import express from"express"

const router=express.Router()

router.patch("/sacar",Auth.autenticar,controller.sacar)
router.patch("/depositar",Auth.autenticar,controller.depositar)
router.patch("/transferir",Auth.autenticar,controller.transferir)


export default{router}