var GoTripUsuario = (function () {
  "use strict";

  var CHAVE = "gotrip_usuario";

  function atual() {
    try {
      var dados = localStorage.getItem(CHAVE);

      if (dados) {
        return JSON.parse(dados);
      }

      return null;
    } catch (erro) {
      return null;
    }
  }

  function criarConta(nome, email) {
    try {
      var usuario = {
        nome: nome.trim(),
        email: email.trim().toLowerCase()
      };

      if (!usuario.nome || !usuario.email) {
        return false;
      }

      localStorage.setItem(CHAVE, JSON.stringify(usuario));
      return true;
    } catch (erro) {
      return false;
    }
  }

  function entrar(email) {
    try {
      var usuario = atual();

      if (!usuario) {
        return false;
      }

      if (usuario.email !== email.trim().toLowerCase()) {
        return false;
      }

      return true;
    } catch (erro) {
      return false;
    }
  }

  function sair() {
    localStorage.removeItem(CHAVE);
  }

  return {
    atual: atual,
    criarConta: criarConta,
    entrar: entrar,
    sair: sair
  };
})();