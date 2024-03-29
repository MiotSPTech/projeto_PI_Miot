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