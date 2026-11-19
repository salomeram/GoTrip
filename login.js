/* GO TRIP — ENTRAR NA CONTA (usa o usuario.js) */
(function () {
  "use strict";

  var form = document.getElementById("form-login");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var erro = document.getElementById("login-erro");
    var email = document.getElementById("login-email").value.trim();
    var senha = document.getElementById("login-senha").value;

    erro.hidden = true;

    if (!email || !senha) {
      erro.textContent = "Preencha o e-mail e a senha.";
      erro.hidden = false;
      return;
    }

    if (typeof GoTripUsuario === "undefined") {
      erro.textContent = "Não foi possível carregar o sistema de conta.";
      erro.hidden = false;
      return;
    }

    if (GoTripUsuario.entrar(email)) {
      window.location.href = "perfil.html?aviso=entrou";
    } else {
      erro.textContent = "E-mail não encontrado. Confira seus dados ou crie uma conta.";
      erro.hidden = false;
    }
  });
})();
