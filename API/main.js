// Importa os módulos necessários
// não altere!
const serialport = require('serialport'); // Módulo para comunicação serial
const express = require('express'); // Módulo para criar um servidor web
const mysql = require('mysql2'); // Módulo para conectar ao MySQL

// Constantes para configurações
// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// Habilita ou desabilita a inserção de dados no banco de dados
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// Função para comunicação serial
const serial = async (
    valoresDht11Umidade,
    //valoresDht11Temperatura,
    //valoresLuminosidade,
    valoresLm35Temperatura,
    //valoresChave
    
) => {
    let poolBancoDados = ''

    // Conexão com o banco de dados MySQL
    poolBancoDados = mysql.createPool(
        {
            // altere!
            // Credenciais do banco de dados
            host: 'localhost', // hosts : localhost ou 127.0.0.1
            user: 'luana', //mudar usuario: luana ou 
            password: 'ETI&61ss3', // mudar senha: ETI&61ss3 ou
            database: 'bdMiot', // mudar nome bancqo
            port: 3307 // portas: 3307 ou 3306
        }
    ).promise();

    // Lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // Configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // Evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // Processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';'); // mudar de acordo com a separação entre dados do seu codigo arduuino
        const dht11Umidade = parseFloat(valores[0]);
        //const dht11Temperatura = parseFloat(valores[1]);
        const lm35Temperatura = parseFloat(valores[1]);
        //const luminosidade = parseFloat(valores[3]);
        //const chave = parseInt(valores[4]);
        
       


        // Armazena os valores dos sensores nos arrays correspondentes
        valoresDht11Umidade.push(dht11Umidade);
        //valoresDht11Temperatura.push(dht11Temperatura);
       // valoresLuminosidade.push(luminosidade);
        valoresLm35Temperatura.push(lm35Temperatura);
        //valoresChave.push(chave);

        // Insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            let umidade3 = dht11Umidade + 2;
            let temperatura3 = lm35Temperatura + 2;
            let umidade4 = dht11Umidade + 4;
            let temperatura4 = lm35Temperatura + 4;
            let umidade5 = dht11Umidade + 6;
            let temperatura5 = lm35Temperatura + 6;
            let umidade7 = dht11Umidade + 8;
            let temperatura7 = lm35Temperatura + 8;
            let umidade8 = umidade3 * 2;
            let temperatura8 = temperatura3 * 2;
            let umidade9 = umidade4 * 2;
            let temperatura9 = temperatura4 * 2;
            let umidade10 = umidade5 * 2;
            let temperatura10 = temperatura5 * 2;
            let umidade11 = umidade7 * 2;
            let temperatura11 = temperatura7 * 2;
            let umidade12 = umidade3 * 3;
            let temperatura12 = temperatura3 * 3;
            let umidade13 = umidade4 * 3;
            let temperatura13 = temperatura4 * 3;
            let umidade14 = umidade5 * 3;
            let temperatura14 = temperatura5 * 3;

            let status3 ='';
            let status4 ='';
            let status5 ='';
            let status7 ='';
            let status8 ='';
            let status9 ='';
            let status10 ='';
            let status11 ='';
            let status12 ='';
            let status13 ='';
            let status14 ='';
            let status15 ='';

            if(umidade3 > 80 || temperatura3 > 70){
                status3 = 'Critico';
            }else if (umidade3 <= 60 || temperatura3 <= 30){
                status3 = 'Normal';
            }else{
                status3 = 'Em Alerta';
            }

            if(umidade4 > 80 || temperatura4 > 70){
                status4 = 'Critico';
            }else if (umidade4 <= 60 || temperatura4 <= 30){
                status4 = 'Normal';
            }else{
                status4 = 'Em Alerta';
            }

            if(umidade5 > 80 || temperatura5 > 70){
                status5 = 'Critico';
            }else if (umidade5 <= 60 || temperatura5 <= 30){
                status5 = 'Normal';
            }else{
                status5 = 'Em Alerta';
            }

            if(umidade7 > 80 || temperatura7 > 70){
                status7 = 'Critico';
            }else if (umidade7 <= 60 || temperatura7 <= 30){
                status7 = 'Normal';
            }else{
                status7 = 'Em Alerta';
            }

            if(umidade8 > 80 || temperatura8 > 70){
                status8 = 'Critico';
            }else if (umidade8 <= 60 || temperatura8 <= 30){
                status8 = 'Normal';
            }else{
                status8 = 'Em Alerta';
            }

            if(umidade9 > 80 || temperatura9 > 70){
                status9 = 'Critico';
            }else if (umidade9 <= 60 || temperatura9 <= 30){
                status9 = 'Normal';
            }else{
                status9 = 'Em Alerta';
            }

            if(umidade10 > 80 || temperatura10 > 70){
                status10 = 'Critico';
            }else if (umidade10 <= 60 || temperatura10 <= 30){
                status10 = 'Normal';
            }else{
                status10 = 'Em Alerta';
            }

            if(umidade11 > 80 || temperatura11 > 70){
                status11 = 'Critico';
            }else if (umidade11 <= 60 || temperatura11 <= 30){
                status11 = 'Normal';
            }else{
                status11 = 'Em Alerta';
            }

            if(umidade12 > 80 || temperatura12 > 70){
                status12 = 'Critico';
            }else if (umidade12 <= 60 || temperatura12 <= 30){
                status12 = 'Normal';
            }else{
                status12 = 'Em Alerta';
            }

            if(umidade13 > 80 || temperatura13 > 70){
                status13 = 'Critico';
            }else if (umidade13 <= 60 || temperatura13 <= 30){
                status13 = 'Normal';
            }else{
                status13 = 'Em Alerta';
            }

            if(umidade14 > 80 || temperatura14 > 70){
                status14 = 'Critico';
            }else if (umidade14 <= 60 || temperatura14 <= 30){
                status14 = 'Normal';
            }else{
                status14 = 'Em Alerta';
            }

            if(dht11Umidade > 80 || lm35Temperatura > 70){
                status15 = 'Critico';
            }else if (dht11Umidade <= 60 || lm35Temperatura <= 30){
                status15 = 'Normal';
            }else{
                status15 = 'Em Alerta';
            }

            // altere!
            // Este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                // 'INSERT INTO tbRegistro (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave)
                'INSERT INTO tbRegistro (leituraUmidade, leituraTemperatura, statusRegistro, idTomada) VALUES (?, ?, ?, 3), (?, ?, ?, 4), (?, ?, ?, 5), (?, ?, ?, 7), (?, ?, ?, 8), (?, ?, ?, 9), (?, ?, ?, 10), (?, ?, ?, 11), (?, ?, ?, 12), (?, ?, ?, 13), (?, ?, ?, 14), (?, ?, ?, 15)',
                [umidade3,
                    temperatura3,
                    status3,
                    umidade4,
                    temperatura4,
                    status4,
                    umidade5,
                    temperatura5,
                    status5,
                    umidade7,
                    temperatura7,
                    status7,
                    umidade8,
                    temperatura8,
                    status8,
                    umidade9,
                    temperatura9,
                    status9,
                    umidade10,
                    temperatura10,
                    status10,
                    umidade11,
                    temperatura11,
                    status11,
                    umidade12,
                    temperatura12,
                    status12,
                    umidade13,
                    temperatura13,
                    status13,
                    umidade14,
                    temperatura14,
                    status14,
                    dht11Umidade,
                    lm35Temperatura,
                    status15] 


                    // dht11Umidade,
                    // lm35Temperatura,
                    // dht11Umidade + 2,
                    // lm35Temperatura + 2,
                    // dht11Umidade + 4,
                    // lm35Temperatura + 4,
                    // dht11Umidade + 6,
                    // lm35Temperatura + 6,
                    // dht11Umidade + 8,
                    // lm35Temperatura + 8


                    //chave] // alterar para o formato do meu banco
            );
            console.log("valores inseridos no banco: ", dht11Umidade + ", " + lm35Temperatura )
        }
        
    });

    // Evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
// Função para criar e configurar o servidor web
const servidor = (
    valoresDht11Umidade,
    //valoresDht11Temperatura,
    //valoresLuminosidade,
    valoresLm35Temperatura,
    //valoresChave
    
) => {
    const app = express();

    // Configurações de CORS
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // Inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // Define os endpoints da API para cada tipo de sensor
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
   /* app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });*/
    /*app.get('/sensores/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade);
    });*/
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresLm35Temperatura);
    });
    /*app.get('/sensores/chave', (_, response) => {
        return response.json(valoresChave);
    });*/
}

// Função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // Arrays para armazenar os valores dos sensores
    const valoresDht11Umidade = [];
    //const valoresDht11Temperatura = [];
   // const valoresLuminosidade = [];
    const valoresLm35Temperatura = [];
    //const valoresChave = [];
    

    // Inicia a comunicação serial
    await serial(
        valoresDht11Umidade,
        //valoresDht11Temperatura,
        //valoresLuminosidade,
        valoresLm35Temperatura,
       // valoresChave
      
    );

    // Inicia o servidor web
    servidor(
        valoresDht11Umidade,
        //valoresDht11Temperatura,
        //valoresLuminosidade,
        valoresLm35Temperatura,
        //valoresChave
        
    );
})();
