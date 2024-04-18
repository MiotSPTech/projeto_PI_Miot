drop database bdTeste;
create database bdTeste;

use bdTeste;

create table tbSensor (
	id int primary key auto_increment
    ,leituraDth11Umidade INT
  --  ,leituraDth11Temperatura varchar(20)
    ,leituraLm35Temperatura int
    );