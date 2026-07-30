import mysql from"mysql2/promise"

const conexao=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"82696884",
    database:"sistemaBancario"
})

export default conexao