// sessão
function validarSessao() {
    var nome = sessionStorage.NOME_REPRESENTANTE;
    var cargo = sessionStorage.CARGO_REPRESENTANTE;

    let nome_perfil = document.getElementById('nome_perfil')
    let cargo_perfil = document.getElementById('cargo_perfil')


    if (cargo != null && nome != null) {
        nome_perfil.innerHTML = nome;
        cargo_perfil.innerHTML = cargo;

    } else {
        window.location = "login_cadastro.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login_cadastro.html";
}

// // carregamento (loading)
// function aguardar() {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "flex";
// }

// function finalizarAguardar(texto) {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "none";

//     var divErrosLogin = document.getElementById("div_erros_login");
//     if (texto) {
//         divErrosLogin.style.display = "flex";
//         divErrosLogin.innerHTML = texto;
//     }
// }

