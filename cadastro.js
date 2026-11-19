/* ==========================================================================
   GO TRIP — CRIAR CONTA
   --------------------------------------------------------------------------
   Salva a conta nova com as listas vazias (0 viagens, 0 lugares, 0 países)
   e leva a pessoa para o perfil.
   ========================================================================== */

(function () {
  "use strict";

  var formulario = document.getElementById("form-cadastro");
  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var erro = document.getElementById("cadastro-erro");

    function mostrarErro(texto) {
      erro.textContent = texto;
      erro.hidden = false;
      erro.setAttribute("tabindex", "-1");
      erro.focus();
    }

    if (typeof window.GoTripUsuario === "undefined") {
      mostrarErro("Não foi possível carregar o sistema de conta. Confira se o arquivo usuario.js está na mesma pasta das páginas.");
      return;
    }

    var nome = document.getElementById("reg-nome").value;
    var email = document.getElementById("reg-email").value;
    var senha = document.getElementById("reg-senha").value;

    if (senha.length < 8) {
      mostrarErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (window.GoTripUsuario.criarConta(nome, email)) {
      window.location.href = "perfil.html?aviso=conta-criada";
    } else {
      mostrarErro("Não foi possível salvar sua conta neste navegador. Verifique se o armazenamento não está bloqueado.");
    }
  });
})();
