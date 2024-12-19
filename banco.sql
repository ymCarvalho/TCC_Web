USE MASTER 
GO
IF EXISTS(SELECT name FROM SYSDATABASES WHERE name = 'BancoTcc')
	DROP DATABASE BancoTcc
go
CREATE DATABASE BancoTcc
go

USE BancoTcc
go

CREATE TABLE tblUsuario (
	 id_usuario INT PRIMARY KEY IDENTITY not null,
	 email VARCHAR(45),
	 senha VARCHAR (200)
)

insert into tblUsuario(email, senha) values (
	'yasmin23@gmail.com','12345678'
)
select * from tblUsuario


SELECT * FROM tblUsuario WHERE email = 'cliente1@gmail.com'
WITH CTE_Duplicados AS (
    SELECT 
        id_usuario,
        ROW_NUMBER() OVER (PARTITION BY email ORDER BY id_usuario) AS RowNum
    FROM tblUsuario
)
DELETE FROM tblUsuario
WHERE id_usuario IN (
    SELECT id_usuario
    FROM CTE_Duplicados
    WHERE RowNum > 1
);