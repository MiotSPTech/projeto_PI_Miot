const signInBtn = document.getElementById("entrar");
const signUpBtn = document.getElementById("cadastro");
const firstForm = document.getElementById("formulario1");
const secondForm = document.getElementById("formulario2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("painel-ativo");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("painel-ativo");
});

firstForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());

