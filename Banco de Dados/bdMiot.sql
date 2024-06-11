drop database bdMiot;
create database bdMiot;
use bdMiot;

create table tbIndustria(
	codigoIndustria char(6) Primary key,
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
    codigoIndustria char(6),
    foreign key (codigoIndustria) references tbIndustria (codigoIndustria)
	);
    
    
create table tbSetor (
	idSetor int primary key auto_increment
    ,andar int 
    ,nomeSetor varchar(45)
    ,ramalSetor varchar(20)
    ,codigoIndustria char(6)
    ,foreign key (codigoIndustria) references tbIndustria (codigoIndustria)
    );
    
create table tbTomada(
	idTomada int Primary key auto_increment,
    descricaoTomada varchar(50) not null,
    aparelhoConectadoTomada varchar (20) not null,
    statusTomada varchar (20) check ( statusTomada in('ligada', 'desligada')),
    idSetor int,
    foreign key (idSetor) references tbSetor (idSetor)
    );
    
    
-- Inserts para tbIndustria
INSERT INTO tbIndustria (codigoIndustria, nomeIndustria, cnpjIndustria, logradouroIndustria, numLogradouroIndustria, cepIndustria, bairroIndustria, cidadeIndustria) 
VALUES 
('HIJ789', 'Metalúrgica LMN', '01234567890123', 'Travessa Metalúrgica', '101', '01234567', 'Bairro da Metalurgia', 'Cidade Metalúrgica');

select * from tbIndustria;

INSERT INTO tbSetor (nomeSetor, ramalSetor, andar, codigoIndustria) 
VALUES
('Sala de Controle','003001', 3, 'HIJ789'),
('Maquinário', '004001', 6, 'HIJ789'),
('Sala de Produção','009001', 1, 'HIJ789');

select * from tbSetor;


-- Inserts para tbTomada
INSERT INTO tbTomada (descricaoTomada, aparelhoConectadoTomada, statusTomada, idSetor) 
VALUES 
('Tomada 1A', 'Esteira Industrial', 'desligada', 1),
('Tomada 2A', 'Garra Mecanica', 'desligada', 1),
('Tomada 3A', 'Misturadoura', 'ligada', 1),
('Tomada 4A',  'Difusor Industrial', 'ligada', 1),
('Tomada 5A', 'Empilhadeira', 'ligada', 1),
('Tomada 1B', 'Esteira Industrial', 'desligada', 2),
('Tomada 2B', 'Garra Mecanica', 'ligada', 2),
('Tomada 3B', 'Misturadoura', 'ligada', 2),
('Tomada 4B',  'Difusor Industrial', 'ligada', 2),
('Tomada 5B', 'Empilhadeira', 'ligada', 2),
('Tomada 1C', 'Esteira Industrial', 'ligada', 3),
('Tomada 2C', 'Garra Mecanica', 'ligada', 3),
('Tomada 3C', 'Misturadoura', 'ligada', 3),
('Tomada 4C',  'Difusor Industrial', 'ligada', 3),
('Tomada 5C', 'Empilhadeira', 'ligada', 3);

select * from tbTomada;