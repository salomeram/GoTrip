/* ==========================================================================
   GO TRIP — MAPA
   As cidades e os lugares vêm da base (pontos.js), os mesmos usados em
   Destinos. Para pôr um lugar novo no mapa, acrescente a atração no
   pontos.js com lat e lng.
   ========================================================================== */
(function () {
  "use strict";

  var CORES = { verde: "#15803d", vermelho: "#b91c1c", azul: "#2563eb" };

  function idDoLugar(lugar) {
    return lugar.id || String(lugar.pagina || "").replace(/\.html$/, "");
  }

  function mostrarCidades(cidades) {
    var lista = document.getElementById("lista-cidades-mapa");
    lista.textContent = "";

    cidades.forEach(function (cidade) {
      var artigo = document.createElement("article");
      artigo.className = "card-recurso";
      artigo.innerHTML =
        '<span class="icone icone-primaria"><i class="fa-solid fa-location-dot" aria-hidden="true"></i></span>' +
        "<div><h2><a></a></h2><p></p></div>";

      var link = artigo.querySelector("a");
      link.href = "mapa.html?cidade=" + encodeURIComponent(cidade.chave);
      link.textContent = cidade.titulo;

      var qtd = cidade.lugares.length;
      artigo.querySelector("p").textContent = qtd + (qtd === 1 ? " lugar no mapa" : " lugares no mapa");

      lista.appendChild(artigo);
    });
  }

  function mostrarMapa(cidade, lugarEscolhido) {
    var lugares = cidade.lugares.filter(function (l) {
      return typeof l.lat === "number" && typeof l.lng === "number";
    });

    if (lugarEscolhido) {
      lugares = lugares.filter(function (l) { return idDoLugar(l) === lugarEscolhido; });
    }

    document.getElementById("vista-escolha").hidden = true;
    document.getElementById("vista-cidade").hidden = false;
    document.getElementById("titulo-cidade").textContent = cidade.titulo;

    var erroMapa = document.getElementById("erro-mapa");

    if (!window.L) {
      erroMapa.textContent = "Não foi possível carregar o mapa. Verifique sua conexão com a internet e atualize a página.";
    } else {
      var mapa = L.map("mapa-cidade", { zoomControl: true, scrollWheelZoom: false });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapa);

      mapa.on("tileerror", function () {
        erroMapa.textContent = "Algumas partes do mapa não carregaram. Verifique sua conexão com a internet.";
      });

      var pontos = [];

      lugares.forEach(function (lugar) {
        var marcador = L.circleMarker([lugar.lat, lugar.lng], {
          radius: 9,
          color: "#ffffff",
          weight: 2,
          fillColor: CORES[lugar.estado] || CORES.azul,
          fillOpacity: 1
        }).addTo(mapa);

        var caixa = document.createElement("div");
        var nome = document.createElement("strong");
        nome.textContent = lugar.nome;
        var tipo = document.createElement("div");
        tipo.textContent = lugar.tipo || "";
        var link = document.createElement("a");
        link.href = lugar.pagina;
        link.textContent = "Ver detalhes";
        caixa.appendChild(nome);
        caixa.appendChild(tipo);
        caixa.appendChild(link);
        marcador.bindPopup(caixa);

        pontos.push([lugar.lat, lugar.lng]);
      });

      if (pontos.length > 1) {
        mapa.fitBounds(pontos, { padding: [35, 35], maxZoom: 15 });
      } else if (pontos.length === 1) {
        mapa.setView(pontos[0], 15);
      } else {
        mapa.setView(cidade.centro, 13);
      }

      setTimeout(function () { mapa.invalidateSize(); }, 300);
    }

    // Lista de lugares abaixo do mapa.
    var info = document.getElementById("cidade-info");
    var tituloLista = document.createElement("h2");
    tituloLista.textContent = "Lugares em " + cidade.cidade;
    info.appendChild(tituloLista);

    var lista = document.createElement("ul");
    lista.className = "lista-lugares";

    lugares.forEach(function (lugar) {
      var item = document.createElement("li");

      var texto = document.createElement("div");
      var link = document.createElement("a");
      link.href = lugar.pagina;
      link.textContent = lugar.nome;
      texto.appendChild(link);
      if (lugar.endereco) {
        var endereco = document.createElement("small");
        endereco.textContent = lugar.endereco;
        texto.appendChild(endereco);
      }

      var selo = document.createElement("span");
      selo.className = "selo";
      if (lugar.estado !== "vermelho") selo.classList.add("selo-verde");
      if (lugar.estado === "vermelho") selo.classList.add("selo-vermelho");
      selo.textContent = lugar.estado === "vermelho" ? "Fechado" : "Aberto";

      item.appendChild(texto);
      item.appendChild(selo);
      lista.appendChild(item);
    });

    info.appendChild(lista);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.GOTRIP_CARREGAR_CIDADES !== "function") {
      return;
    }

    window.GOTRIP_CARREGAR_CIDADES().then(function (cidades) {
      var parametros = new URLSearchParams(window.location.search);
      var chave = parametros.get("cidade");
      var cidade = cidades.filter(function (c) { return c.chave === chave; })[0];

      if (cidade) {
        mostrarMapa(cidade, parametros.get("lugar"));
      } else {
        mostrarCidades(cidades);
      }
    });
  });
})();
