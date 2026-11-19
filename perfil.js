/* ==========================================================================
   GO TRIP — PERFIL
   --------------------------------------------------------------------------
   Lê a conta e mostra os números reais. Conta nova = 0 viagens,
   0 lugares, 0 países. Os números só mudam quando a pessoa acrescenta
   uma viagem ou um lugar.
   ========================================================================== */

(function () {
  "use strict";

  var avatar = document.getElementById("avatar");
  var titulo = document.getElementById("titulo-perfil");
  var numViagens = document.getElementById("num-viagens");
  var numLugares = document.getElementById("num-lugares");
  var numPaises = document.getElementById("num-paises");
  var listaViagens = document.getElementById("lista-viagens");
  var listaLugares = document.getElementById("lista-lugares");
  var formViagem = document.getElementById("form-viagem");
  var formLugar = document.getElementById("form-lugar");
  var botaoSair = document.getElementById("sair");

  if (!avatar || typeof window.GoTripUsuario === "undefined") {
    return;
  }

  var usuario = window.GoTripUsuario.atual();
  var params = new URLSearchParams(location.search);

  if (!usuario) {
    document.getElementById("perfil-aviso").hidden = false;
    desenhar();
    return;
  }

  /* Nome e iniciais */
  var nome = (usuario.nome || "").trim();
  var partes = nome ? nome.split(/\s+/) : [];
  avatar.textContent = partes.length
    ? (partes[0].charAt(0) + (partes.length > 1 ? partes[partes.length - 1].charAt(0) : "")).toUpperCase()
    : "?";
  if (nome) {
    titulo.textContent = nome;
  }

  botaoSair.hidden = false;

  var aviso = params.get("aviso");
  var texto = aviso === "conta-criada" ? "Conta criada com sucesso. Bem-vindo(a) ao GoTrip!"
            : aviso === "entrou" ? "Você entrou na sua conta." : "";
  if (texto) {
    var caixa = document.getElementById("perfil-boasvindas");
    caixa.hidden = false;
    setTimeout(function () {
      document.getElementById("perfil-boasvindas-texto").textContent = texto;
    }, 100);
  }

  function desenhar() {
    var dados = window.GoTripUsuario.dados();

    numViagens.textContent = dados.viagens.length;
    numLugares.textContent = dados.lugares.length;
    numPaises.textContent = dados.paises;

    listaViagens.textContent = "";
    if (!dados.viagens.length) {
      var vazio = document.createElement("li");
      vazio.textContent = "Nenhuma viagem ainda. Acrescente a primeira acima.";
      listaViagens.appendChild(vazio);
    }
    dados.viagens.forEach(function (viagem, posicao) {
      var item = document.createElement("li");
      var rotulo = document.createElement("span");
      rotulo.textContent = viagem;

      var tirar = document.createElement("button");
      tirar.type = "button";
      tirar.className = "agenda-tirar";
      tirar.setAttribute("aria-label", "Tirar " + viagem + " das minhas viagens");
      tirar.textContent = "Tirar";
      tirar.addEventListener("click", function () {
        window.GoTripUsuario.removerViagem(posicao);
        desenhar();
      });

      item.appendChild(rotulo);
      item.appendChild(tirar);
      listaViagens.appendChild(item);
    });

    listaLugares.textContent = "";
    if (!dados.lugares.length) {
      var vazioLugar = document.createElement("li");
      vazioLugar.className = "agenda-vazio";
      vazioLugar.textContent = "Nenhum lugar ainda. Acrescente o primeiro acima.";
      listaLugares.appendChild(vazioLugar);
    }
    dados.lugares.forEach(function (lugar, posicao) {
      var item = document.createElement("li");
      item.textContent = lugar;

      var tirar = document.createElement("button");
      tirar.type = "button";
      tirar.className = "chip-tirar";
      tirar.setAttribute("aria-label", "Tirar " + lugar + " dos lugares visitados");
      tirar.setAttribute("aria-hidden", "false");
      tirar.textContent = "×";
      tirar.addEventListener("click", function () {
        window.GoTripUsuario.removerLugar(posicao);
        desenhar();
      });

      item.appendChild(tirar);
      listaLugares.appendChild(item);
    });
  }

  formViagem.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var campo = document.getElementById("nova-viagem");
    if (window.GoTripUsuario.adicionarViagem(campo.value)) {
      campo.value = "";
      desenhar();
    }
  });

  formLugar.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var campo = document.getElementById("novo-lugar");
    if (window.GoTripUsuario.adicionarLugar(campo.value)) {
      campo.value = "";
      desenhar();
    }
  });

  botaoSair.addEventListener("click", function () {
    window.GoTripUsuario.sair();
  });

  desenhar();
})();
