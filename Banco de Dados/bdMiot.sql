 drop database bdMiot;
create database bdMiot;
use bdMiot;

create table tbIndustria(
	idIndustria int Primary key auto_increment,
    nomeIndustria varchar(70) not null,
    cnpjIndustria char(14) not null,
    logradouroIndustria varchar (70) not null,
    numLogradouroIndustria varchar (10) not null,
    cepIndustria char(9) not null,
    bairroIndustria varchar (50) not null,
    cidadeIndustria varchar (45) not null
    );
 
 create table  tbRepresentante (
	idRepresentante int primary key auto_increment,
    nomeRepresentante varchar (70) not null,
    cpfRepresentante char (11) not null,
    cargoRepresentante varchar (30) not null,
    emailRepresentante varchar (60) not null,
    senhaRepresentante varchar(200) not null,
    idIndustria int,
    foreign key (idIndustria) references tbIndustria (idIndustria)
	);

create table tbTomada(
	idTomada int Primary key auto_increment,
    descricaoTomada varchar(50) not null,
    localizacaoTomada varchar(60) not null,
    voltagemTomada varchar (20) not null,
    tipoTomada varchar (20) not null,
    statusTomada varchar (20) check ( statusTomada in('ligada', 'desligada')),
    codVerificacaoSistemaTomada varchar (8) not null,
    idIndustria int,
    foreign key (idIndustria) references tbIndustria (idIndustria)
    );
    
create table tbAlerta(
	idAlerta int primary key auto_increment,
    dataHoraAlerta datetime not null default current_timestamp,
	notificacaoAlerta varchar(45) not null,
    statusAlerta varchar (20) check ( statusAlerta in ('em Aberto', 'Resolvido', 'Ignorado')),
    idTomada int,
    foreign key (idTomada) references tbTomada (idTomada)
    );
    
    create table tbSensor(
	idSensor int primary key auto_increment,
    tipoSensor varchar (20)  not null check (tipoSensor in ('Temperatura', 'Umidade')),
    idTomada int,
    foreign key (idTomada) references tbTomada (idTomada)
    );
    
    create table tbRegistro(
    idRegistro int primary key auto_increment,
    dataHoraRegistro datetime not null default current_timestamp,
	leituraSensor decimal(3,1) not null,
    statusRegistro varchar(20) not null check (statusRegistro in ('Normal', 'Irregularidade', 'Risco')),
    idSensor int,
    foreign key (idSensor) references tbSensor (idSensor)
    );
    
-- Inserts para tbIndustria
INSERT INTO tbIndustria (nomeIndustria, cnpjIndustria, logradouroIndustria, numLogradouroIndustria, cepIndustria, bairroIndustria, cidadeIndustria) 
VALUES 
('Indústria XYZ', '98765432109876', 'Avenida Industrial', '456', '98765432', 'Centro Industrial', 'Cidade dos Produtos'),
('Fábrica ABC', '54321678901234', 'Rua da Fábrica', '789', '54321678', 'Bairro da Produção', 'Cidade da Manufatura'),
('Metalúrgica LMN', '01234567890123', 'Travessa Metalúrgica', '101', '01234567', 'Bairro da Metalurgia', 'Cidade Metalúrgica'),
('Tecidos e Cia', '78901234567890', 'Avenida do Tecido', '123', '78901234', 'Bairro dos Tecidos', 'Cidade Têxtil'),
('Produtos Químicos S.A.', '23456789012345', 'Rua dos Químicos', '567', '23456789', 'Bairro Químico', 'Cidade dos Produtos Químicos');

select * from tbIndustria;

-- Inserts para tbRepresentante
INSERT INTO tbRepresentante (nomeRepresentante, cpfRepresentante, cargoRepresentante, emailRepresentante, senhaRepresentante, idIndustria) 
VALUES 
('Fernanda Silva', '98765432101', 'Supervisor', 'fernanda@industria.xyz', 'senha456', 2),
('Ricardo Oliveira', '65432109876', 'Técnico', 'ricardo@fabricaabc.com', 'senha789', 3),
('Carla Santos', '78901234567', 'Moderador', 'carla@metalurgica.com', 'senha012', 4),
('Lucas Pereira', '01234567890', 'Técnico', 'lucas@tecidoscia.com', 'senha789', 5),
('Patrícia Lima', '56789012345', 'Gestor', 'patricia@produtosquimicos.com', 'senha012', 1);

select * from tbRepresentante;

-- Inserts para tbTomada
INSERT INTO tbTomada (descricaoTomada, localizacaoTomada, voltagemTomada, tipoTomada, statusTomada, codVerificacaoSistemaTomada, idIndustria) 
VALUES 
('Tomada 2', 'Sala de Operações', '220V', 'Tipo B', 'desligada', 'DEF456', 3),
('Tomada 3', 'Área de Produção', '110V', 'Tipo A', 'desligada', 'GHI789', 4),
('Tomada 4', 'Almoxarifado', '220V', 'Tipo B', 'ligada', 'JKL012', 5),
('Tomada 5', 'Sala de Testes', '110V', 'Tipo A', 'desligada', 'MNO345', 2),
('Tomada 6', 'Sala de Controle', '220V', 'Tipo B', 'ligada', 'PQR678', 1);

select * from tbTomada;

-- Inserts para tbAlerta
INSERT INTO tbAlerta (notificacaoAlerta, statusAlerta, idTomada) 
VALUES 
('Alerta de possivel curto-circuito', 'em Aberto', 2),
('Alerta de alta temperatura', 'em Aberto', 3),
('Alerta de possivel curto-circuito', 'Resolvido', 4),
('Alerta de voltagem irregular', 'em Aberto', 5),
('Alerta de possivel curto-circuito', 'Ignorado', 5);

select * from tbAlerta;

-- Inserts para tbSensor
INSERT INTO tbSensor (tipoSensor, idTomada) 
VALUES 
('Umidade', 1),
('Temperatura', 2),
('Umidade', 3),
('Temperatura', 4),
('Umidade', 5);

select * from tbSensor;

-- Inserts para tbRegistro
INSERT INTO tbRegistro (leituraSensor, statusRegistro, idSensor) 
VALUES 
(20.5, 'Normal', 1),
(25.0, 'Irregularidade', 2),
(60.2, 'Risco', 3),
(28.7, 'Normal', 4),
(0.0, 'Irregularidade', 5);

select * from tbRegistro;

-- select que traz todas as tomadas de uma determinada industria
select descricaoTomada, localizacaoTomada, statusTomada, statusRegistro from tbIndustria
inner join tbTomada on tbIndustria.idIndustria = tbTomada.idIndustria
inner join tbSensor on tbTomada.idTomada = tbSensor.idTomada
inner join tbRegistro on tbSensor.idSensor = tbRegistro.idSensor
where tbIndustria.idIndustria = 2;

-- select que retorna todas as informações do Alerta
select descricaoTomada, localizacaoTomada, notificacaoAlerta, dataHoraAlerta, statusAlerta, leituraSensor from tbTomada
inner join tbAlerta on tbAlerta.idTomada = tbTomada.idTomada
inner join tbSensor on tbSensor.idTomada = tbTomada.idTomada
inner join tbRegistro on tbRegistro.idSensor = tbSensor.idSensor
where tbAlerta.idAlerta = 1;

-- select que traz todas as informações de uma tomada especifica 
select descricaoTomada, localizacaoTomada, voltagemTomada, tipoTomada, statusTomada, leituraSensor, statusRegistro, dataHoraRegistro from tbTomada
inner join tbAlerta on tbAlerta.idTomada = tbTomada.idTomada
inner join tbSensor on tbSensor.idTomada = tbTomada.idTomada
inner join tbRegistro on tbRegistro.idSensor = tbSensor.idSensor
where tbTomada.idTomada = 3;

-- select que retorna histórico de alertas
select descricaoTomada, notificacaoAlerta, dataHoraAlerta, dataHoraRegistro, statusRegistro, StatusAlerta, localizacaoTomada, leituraSensor from tbTomada
inner join tbAlerta on tbAlerta.idTomada = tbTomada.idTomada
inner join tbSensor on tbSensor.idTomada = tbTomada.idTomada
inner join tbRegistro on tbRegistro.idSensor = tbSensor.idSensor
order by tbAlerta.dataHoraAlerta desc;