/* ==========================================================================
   GO TRIP — CARREGAR A BASE (atrações + cidades)
   --------------------------------------------------------------------------
   Hoje tudo vem do arquivo pontos.js.
   Se um dia você quiser uma base de dados na internet, basta trocar o valor
   de ENDERECO_DA_BASE logo abaixo pelo endereço do serviço. Ele deve
   responder com { "pontos": [...], "cidades": [...] }.
   O resto do site continua igual.

   Funções que as páginas usam:
     GOTRIP_CARREGAR_PONTOS()   -> lista de atrações
     GOTRIP_CARREGAR_CIDADES()  -> lista de cidades, cada uma com
                                   .lugares = atrações daquela cidade
   ========================================================================== */

(function () {
  "use strict";

  /* Deixe "" para usar o arquivo pontos.js. */
  var ENDERECO_DA_BASE = "";

  var promessa = null;

  function baseLocal() {
    return {
      pontos: window.PONTOS_TURISTICOS || [],
      cidades: window.CIDADES_GOTRIP || []
    };
  }

  function carregarBase() {
    if (promessa) {
      return promessa;
    }

    if (ENDERECO_DA_BASE === "") {
      promessa = Promise.resolve(baseLocal());
      return promessa;
    }

    promessa = fetch(ENDERECO_DA_BASE)
      .then(function (resposta) {
        if (!resposta.ok) {
          throw new Error("A base de dados respondeu com erro " + resposta.status);
        }
        return resposta.json();
      })
      .then(function (dados) {
        var local = baseLocal();
        return {
          pontos: Array.isArray(dados) ? dados : (dados.pontos || local.pontos),
          cidades: (dados && dados.cidades) || local.cidades
        };
      })
      .catch(function (erro) {
        console.warn("GoTrip: não consegui ler a base de dados,", erro.message);
        return baseLocal();
      });

    return promessa;
  }

  window.GOTRIP_CARREGAR_PONTOS = function () {
    return carregarBase().then(function (base) {
      return base.pontos;
    });
  };

  window.GOTRIP_CARREGAR_CIDADES = function () {
    return carregarBase().then(function (base) {
      return base.cidades.map(function (cidade) {
        var copia = Object.assign({}, cidade);
        copia.lugares = base.pontos.filter(function (ponto) {
          return ponto.cidade === cidade.cidade;
        });
        return copia;
      });
    });
  };
})();
