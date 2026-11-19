/* ==========================================================================
   GO TRIP — CONTAS E DADOS DA PESSOA
   --------------------------------------------------------------------------
   Guarda a conta no navegador. Uma conta nova nasce SEMPRE com:
     0 viagens, 0 lugares, 0 países.
   Nada de números de exemplo: os números só mudam quando a pessoa
   acrescenta uma viagem ou um lugar de verdade.

   Como usar:
     GoTripUsuario.criarConta("Maria Souza", "maria@gotrip.com")  -> true/false
     GoTripUsuario.entrar("maria@gotrip.com")                      -> true/false
     GoTripUsuario.atual()   -> conta ou null
     GoTripUsuario.sair()
     GoTripUsuario.dados()   -> { viagens: [], lugares: [] }
     GoTripUsuario.adicionarViagem("Roma, Itália")
     GoTripUsuario.adicionarLugar("Coliseu")
     GoTripUsuario.removerViagem(0)
     GoTripUsuario.removerLugar(0)
   ========================================================================== */

(function () {
  "use strict";

  var CHAVE_CONTAS = "gotrip-contas";
  var CHAVE_SESSAO = "gotrip-sessao";

  function ler(chave, padrao) {
    try {
      var bruto = localStorage.getItem(chave);
      return bruto ? JSON.parse(bruto) : padrao;
    } catch (erro) {
      return padrao;
    }
  }

  function gravar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (erro) {
      return false;
    }
  }

  function normalizarEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  /* Uma conta nova: listas vazias. É daqui que vem o 0 / 0 / 0. */
  function contaNova(nome, email) {
    return {
      nome: String(nome || "").trim(),
      email: normalizarEmail(email),
      viagens: [],
      lugares: []
    };
  }

  function contas() {
    return ler(CHAVE_CONTAS, {});
  }

  function salvarContas(lista) {
    return gravar(CHAVE_CONTAS, lista);
  }

  function contaAtual() {
    var email = ler(CHAVE_SESSAO, "");
    if (!email) {
      return null;
    }
    var conta = contas()[email];
    return conta || null;
  }

  function salvarConta(conta) {
    var lista = contas();
    lista[conta.email] = conta;
    return salvarContas(lista);
  }

  /* Quantos países diferentes aparecem nas viagens ("Roma, Itália" -> Itália) */
  function contarPaises(conta) {
    var paises = [];
    (conta && conta.viagens ? conta.viagens : []).forEach(function (viagem) {
      var partes = String(viagem).split(",");
      var pais = (partes[1] || "").trim();
      if (pais && paises.indexOf(pais) === -1) {
        paises.push(pais);
      }
    });
    return paises.length;
  }

  window.GoTripUsuario = {
    criarConta: function (nome, email) {
      nome = String(nome || "").trim();
      email = normalizarEmail(email);

      if (!nome || !email || email.indexOf("@") === -1) {
        return false;
      }

      var lista = contas();
      if (!lista[email]) {
        lista[email] = contaNova(nome, email);
        if (!salvarContas(lista)) {
          return false;
        }
      }
      gravar(CHAVE_SESSAO, email);
      return true;
    },

    entrar: function (email) {
      email = normalizarEmail(email);
      if (!email || !contas()[email]) {
        return false;
      }
      gravar(CHAVE_SESSAO, email);
      return true;
    },

    atual: function () {
      return contaAtual();
    },

    sair: function () {
      try {
        localStorage.removeItem(CHAVE_SESSAO);
      } catch (erro) {}
    },

    dados: function () {
      var conta = contaAtual();
      return {
        viagens: conta && conta.viagens ? conta.viagens.slice() : [],
        lugares: conta && conta.lugares ? conta.lugares.slice() : [],
        paises: contarPaises(conta)
      };
    },

    adicionarViagem: function (texto) {
      var conta = contaAtual();
      texto = String(texto || "").trim();
      if (!conta || !texto) {
        return false;
      }
      conta.viagens.push(texto);
      return salvarConta(conta);
    },

    adicionarLugar: function (texto) {
      var conta = contaAtual();
      texto = String(texto || "").trim();
      if (!conta || !texto) {
        return false;
      }
      conta.lugares.push(texto);
      return salvarConta(conta);
    },

    removerViagem: function (posicao) {
      var conta = contaAtual();
      if (!conta || !conta.viagens[posicao]) {
        return false;
      }
      conta.viagens.splice(posicao, 1);
      return salvarConta(conta);
    },

    removerLugar: function (posicao) {
      var conta = contaAtual();
      if (!conta || !conta.lugares[posicao]) {
        return false;
      }
      conta.lugares.splice(posicao, 1);
      return salvarConta(conta);
    }
  };
})();
