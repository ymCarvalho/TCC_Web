const express = require("express");
const app = express();
const sql = require("mssql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: "sa", // Usuário do SQL Server
  password: "123456", // Senha do SQL Server
  server: "DESKTOP-D3JAI1B", // Nome do servidor
  port: 1433, // Porta do SQL Server
  database: "BancoTcc", // Nome do banco de dados
  options: {
    encrypt: false, // Necessário para Azure e conexões seguras
    trustServerCertificate: true, // Ignora o certificado SSL
  },
};

// Conexão inicial com o banco de dados
sql
  .connect(dbConfig)
  .then(() => {
    console.log("Conexão bem-sucedida com o SQL Server!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return console.log("Email e senha são obrigatórios!");
  }

  const query1 = `SELECT * FROM tblUsuario WHERE email = '${email}'`;
  sql.query(query1, (err, result) => {
    if (err) {
      err.send(err);
    }
    if (result.recordset.length === 0) {
      const query2 = `INSERT INTO tblUsuario (email, senha) VALUES ('${email}', '${password}')`;
      sql.query(query2, (err) => {
        if (err) {
          return res.status(500).send({ error: "Erro ao cadastrar o usuário" });
        }
        console.log("Usuário cadastrado com sucesso!");
      });
    } else {
      console.log("Usuario ja existe");
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return console.log("Email e senha são obrigatórios!");
  }

  const query = `SELECT email FROM tblUsuario WHERE email = '${email}'`;
  sql.query(query, (err, result) => {
    if (err) {
      err.send(err);
    }
    if (result.recordset.length > 0) {
      const query2 = `SELECT email FROM tblUsuario WHERE email = '${email}' and senha = '${password}'`;
      sql.query(query2, (err, result) => {
        if (err) {
          err.send(err);
        }
        if (result.recordset.length > 0) {
          console.log("Usuário logado com sucesso!");
        } else {
          console.log("senha incorreta");
        }
      });
    } else {
      console.log("faça seu cadastro ");
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
