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
    valoresumidade2,
    valorestemperatura2,
    valoresumidade3,
    valorestemperatura3,
    valoresumidade4,
    valorestemperatura4,
    valoresumidade5,
    valorestemperatura5
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
            database: 'bdMiot', // mudar nome banco
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
        let umidade2 = dht11Umidade + 2;
        let temperatura2 = lm35Temperatura + 2;
        let umidade3 = dht11Umidade + 4;
        let temperatura3 = lm35Temperatura + 4;
        let umidade4 = dht11Umidade + 6;
        let temperatura4 = lm35Temperatura + 6;
        let umidade5 = dht11Umidade + 8;
        let temperatura5 = lm35Temperatura + 8;
       


        // Armazena os valores dos sensores nos arrays correspondentes
        valoresDht11Umidade.push(dht11Umidade);
        //valoresDht11Temperatura.push(dht11Temperatura);
       // valoresLuminosidade.push(luminosidade);
        valoresLm35Temperatura.push(lm35Temperatura);
        //valoresChave.push(chave);
        valoresumidade2.push(umidade2);
        valorestemperatura2.push(temperatura2);
        valoresumidade3.push(umidade3);
        valorestemperatura3.push(temperatura3);
        valoresumidade4.push(umidade4);
        valorestemperatura4.push(temperatura4);
        valoresumidade5.push(umidade5);
        valorestemperatura5.push(temperatura5);

        // Insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // altere!
            // Este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                // 'INSERT INTO tbRegistro (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave)
                'INSERT INTO tbRegistro (leituraUmidade, leituraTemperatura, idTomada) VALUES (?, ?, 1), (?, ?, 2), (?, ?, 3), (?, ?, 4), (?, ?, 5)',
                [dht11Umidade,
                    lm35Temperatura,
                    umidade2,
                    temperatura2,
                    umidade3,
                    temperatura3,
                    umidade4,
                    temperatura4,
                    umidade5,
                    temperatura5] 


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
            console.log("valores inseridos no banco: ", umidade2 + ", " + temperatura2 )
            console.log("valores inseridos no banco: ", umidade3 + ", " + temperatura3 )
            console.log("valores inseridos no banco: ", umidade4 + ", " + temperatura4)
            console.log("valores inseridos no banco: ", umidade5 + ", " + temperatura5 )
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
    valoresumidade2,
    valorestemperatura2,
    valoresumidade3,
    valorestemperatura3,
    valoresumidade4,
    valorestemperatura4,
    valoresumidade5,
    valorestemperatura5
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
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valorestemperatura2);
    });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valorestemperatura3);
    });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valorestemperatura4);
    });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valorestemperatura5);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresumidade2);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresumidade3);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresumidade4);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresumidade5);
    });
}

// Função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // Arrays para armazenar os valores dos sensores
    const valoresDht11Umidade = [];
    //const valoresDht11Temperatura = [];
   // const valoresLuminosidade = [];
    const valoresLm35Temperatura = [];
    //const valoresChave = [];
    const valoresumidade2 = [];
    const valorestemperatura2 = [];
    const valoresumidade3 = [];
    const valorestemperatura3 = [];
    const valoresumidade4 = [];
    const valorestemperatura4 = [];
    const valoresumidade5 = [];
    const valorestemperatura5 = [];

    // Inicia a comunicação serial
    await serial(
        valoresDht11Umidade,
        //valoresDht11Temperatura,
        //valoresLuminosidade,
        valoresLm35Temperatura,
       // valoresChave
       valoresumidade2,
       valorestemperatura2,
       valoresumidade3,
       valorestemperatura3 ,
       valoresumidade4,
       valorestemperatura4 ,
       valoresumidade5,
       valorestemperatura5
    );

    // Inicia o servidor web
    servidor(
        valoresDht11Umidade,
        //valoresDht11Temperatura,
        //valoresLuminosidade,
        valoresLm35Temperatura,
        //valoresChave
        valoresumidade2,
       valorestemperatura2,
       valoresumidade3,
       valorestemperatura3 ,
       valoresumidade4,
       valorestemperatura4 ,
       valoresumidade5,
       valorestemperatura5
    );
})();
