
import dotenv from "dotenv"
const result=dotenv.config()
import mysql from"mysql2/promise"

console.log( process.env.HOST,process.env.USER,process.env.PASSWORD,process.env.DATABASE
   )

const conexao=mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

export default conexao