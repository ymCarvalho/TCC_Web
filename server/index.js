const express = require("express");
const app = express();
const sql = require("mssql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = {
    user: "sa", // Usuário do SQL Server
    password: "123456", // Senha do SQL Server
    server: "DESKTOP-D3JAI1B", // Nome do servidor
    instanceName: "SQLEXPRESS", // Nome da instância
      port: 1433, // Ou porta dinâmica, se configurada
    database: "BancoTcc", // Nome do banco de dados
    options: {
      encrypt: false, // Necessário para Azure e conexões seguras
      trustServerCertificate: false, // Ignora o certificado SSL
    },
  };

sql.connect(db)
  .then(() => {
    console.log("Conexão bem-sucedida com o SQL Server!");
  })
  .catch((err) => {
    console.error("Erro ao conectar:", err);
  });
  app.listen(3001, () => {console.log("rodando 3001")})
  
  app.get("/",(req,res)=>{res.send("hello world")})//ta funcionandoooooo

