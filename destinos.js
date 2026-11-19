/* ==========================================================================
   GO TRIP — PÁGINA DE DESTINOS
   Monta os cartões das cidades a partir da base (pontos.js) e filtra pela
   busca. A lista de pontos turísticos logo abaixo é feita pelo script.js.
   ========================================================================== */
(function () {
  "use strict";

  var lista = document.getElementById("lista-cidades");
  var campo = document.getElementById("busca");
  var aviso = document.getElementById("resultado-cidades");

  if (!lista || typeof window.GOTRIP_CARREGAR_CIDADES !== "function") {
    return;
  }

  var cidades = [];

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function criarCartao(cidade) {
    var artigo = document.createElement("article");
    artigo.className = "card-destino";

    if (cidade.foto) {
      var img = document.createElement("img");
      img.src = cidade.foto;
      img.alt = cidade.alt || cidade.titulo;
      img.width = 88;
      img.height = 88;
      img.loading = "lazy";
      artigo.appendChild(img);
    }

    var conteudo = document.createElement("div");

    var selo = document.createElement("span");
    selo.className = ("selo " + (cidade.corSelo || "")).trim();
    selo.textContent = cidade.regiao;

    var titulo = document.createElement("h3");
    var link = document.createElement("a");
    link.href = cidade.pagina;
    link.textContent = cidade.titulo;
    titulo.appendChild(link);

    var descricao = document.createElement("p");
    var qtd = cidade.lugares.length;
    descricao.textContent = cidade.descricao + " • " + qtd +
      (qtd === 1 ? " ponto turístico" : " pontos turísticos");

    conteudo.appendChild(selo);
    conteudo.appendChild(titulo);
    conteudo.appendChild(descricao);
    artigo.appendChild(conteudo);

    return artigo;
  }

  function filtrar() {
    var termo = campo ? normalizar(campo.value.trim()) : "";
    var achados = 0;

    lista.textContent = "";

    cidades.forEach(function (cidade) {
      var texto = normalizar(cidade.titulo + " " + cidade.regiao + " " +
        cidade.lugares.map(function (l) { return l.nome; }).join(" "));

      if (!termo || texto.indexOf(termo) !== -1) {
        lista.appendChild(criarCartao(cidade));
        achados++;
      }
    });

    if (!aviso) {
      return;
    }
    if (!termo) {
      aviso.textContent = "";
    } else if (achados === 0) {
      aviso.textContent = 'Nenhuma cidade encontrada para "' + campo.value.trim() + '".';
    } else {
      aviso.textContent = achados + (achados === 1 ? " cidade encontrada." : " cidades encontradas.");
    }
  }

  if (campo) {
    campo.addEventListener("input", filtrar);
  }
  var form = document.getElementById("form-busca");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      filtrar();
    });
  }

  window.GOTRIP_CARREGAR_CIDADES().then(function (lista) {
    cidades = lista;
    var busca = new URLSearchParams(location.search).get("busca");
    if (campo && busca) {
      campo.value = busca;
    }
    filtrar();
  });
})();
