USE PROJETO_ROMAN;

INSERT INTO TIPOUSUARIO(tipo)
VALUES ('ADMIN'), ('PROFESSOR');
GO

INSERT INTO USUARIO(idTipoUsuario,nome,email,senha)
VALUES ('1', 'Admin', 'admin@email.com', 'admin123'),
       ('2', 'Lucas', 'lucas@email.com', 'lucas123'),
	   ('2', 'Saulo', 'saulo@email.com', 'saulo123'),
	   ('2', 'Gustavo', 'gustavo@email.com', 'gustavo123'),
	   ('2', 'Samuel', 'samuel@email.com', 'samuel123')
GO


INSERT INTO PROFESSORES(idUsuario, nomeProfessor)
VALUES ('2','Lucas'),
       ('3', 'Saulo'),
	   ('4', 'Gustavo'),
	   ('5', 'Samuel')
GO

INSERT INTO TEMA(nomeTema)
VALUES ('Gestão'),
       ('HQs'),
	   ('Games'),
	   ('Tecnologia'),
	   ('ReactNative'),
	   ('Fisica Quântica')
GO

INSERT INTO PROJETOS(idTema,idUsuario,nomeProjeto,descricao)
VALUES ('1', '2', 'Controle de Estoque', 'Projeto que ajuda na realização do controle de estoque'),
	   ('2', '3', 'Listagem de Personagem', 'Projeto que mostra a forma de listagem de personagens especificos do universo das HQs')	
GO
