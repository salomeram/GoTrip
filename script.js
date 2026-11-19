
/* ==========================================================================
   GO TRIP — SCRIPT PRINCIPAL
   --------------------------------------------------------------------------
   Este arquivo cuida de duas coisas:
     1) O botão de tema claro / escuro, em todas as páginas.
     2) A lista de atrações: carrega, mostra os cartões e filtra pela busca.
   As atrações ficam no arquivo pontos.js (ou numa base de dados na internet,
   se você apontar o endereço em base-atracoes.js).
   ========================================================================== */

/* ==========================================================================
   1. TEMA CLARO / ESCURO
   Cria o botão no cabeçalho de TODAS as páginas (não precisa mudar o HTML)
   e lembra a escolha da pessoa com localStorage.
   ========================================================================== */
(function () {
  "use strict";

  var CHAVE = "gotrip-tema";
  var raiz = document.documentElement;

  function aplicarTema(tema) {
    if (tema === "claro") {
      raiz.setAttribute("data-theme", "claro");
    } else {
      raiz.removeAttribute("data-theme");
    }
  }

  aplicarTema(localStorage.getItem(CHAVE));

  var cabecalho = document.querySelector("header");
  if (!cabecalho) {
    return;
  }

  var botao = document.createElement("button");
  botao.type = "button";
  botao.className = "botao-tema";

  function atualizarBotao() {
    var claro = raiz.getAttribute("data-theme") === "claro";
    botao.innerHTML = claro
      ? '<i class="fa-solid fa-moon" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
    botao.setAttribute("aria-label", claro ? "Ativar tema escuro" : "Ativar tema claro");
    botao.setAttribute("aria-pressed", claro ? "true" : "false");
  }

  botao.addEventListener("click", function () {
    var novoTema = raiz.getAttribute("data-theme") === "claro" ? "escuro" : "claro";
    localStorage.setItem(CHAVE, novoTema);
    aplicarTema(novoTema);
    atualizarBotao();
  });

  atualizarBotao();
  cabecalho.appendChild(botao);
})();

/* ==========================================================================
   2. ATRAÇÕES — carrega da base, mostra os cartões e filtra
   Funciona na página de destinos (destinos.html), onde existe a lista
   com id="lista-pontos". Nas outras páginas o script termina aqui mesmo.
   ========================================================================== */
(function () {
  "use strict";

  var campoBusca = document.getElementById("busca");
  var filtroCidade = document.getElementById("filtro-cidade");
  var lista = document.getElementById("lista-pontos");
  var aviso = document.getElementById("resultado-busca");
  var formulario = document.getElementById("form-busca");

  // Na página inicial não existe a lista de pontos.
  if (!lista) {
    return;
  }

  var pontosTuristicos = [];

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* Preenche o menu de cidades com as cidades que existem na base.
     Assim você não precisa escrever as cidades no HTML: basta acrescentar
     a atração no pontos.js e ela aparece aqui sozinha. */
  function preencherCidades() {
    if (!filtroCidade) {
      return;
    }

    var cidades = [];
    pontosTuristicos.forEach(function (ponto) {
      if (cidades.indexOf(ponto.cidade) === -1) {
        cidades.push(ponto.cidade);
      }
    });
    cidades.sort();

    filtroCidade.textContent = "";

    var todas = document.createElement("option");
    todas.value = "";
    todas.textContent = "Todas as cidades";
    filtroCidade.appendChild(todas);

    cidades.forEach(function (cidade) {
      var opcao = document.createElement("option");
      opcao.value = cidade;
      opcao.textContent = cidade;
      filtroCidade.appendChild(opcao);
    });
  }

  function criarCartao(ponto) {
    var artigo = document.createElement("article");
    var conteudo = document.createElement("div");
    var selo = document.createElement("span");
    var titulo = document.createElement("h3");
    var link = document.createElement("a");
    var descricao = document.createElement("p");

    artigo.className = "card-destino";

    if (ponto.foto) {
      var img = document.createElement("img");
      img.src = ponto.foto;
      img.alt = ponto.nome + ", " + ponto.cidade;
      img.width = 88;
      img.height = 88;
      img.loading = "lazy";
      artigo.appendChild(img);
    } else {
      var miniatura = document.createElement("span");
      miniatura.className = "miniatura";
      miniatura.setAttribute("aria-hidden", "true");
      miniatura.textContent = ponto.icone || "📍";
      artigo.appendChild(miniatura);
    }

    selo.className = "selo selo-verde";
    selo.textContent = ponto.cidade;

    link.href = ponto.pagina;
    link.textContent = ponto.nome;
    titulo.appendChild(link);

    descricao.textContent = ponto.descricao
      ? ponto.descricao + " • " + ponto.pais
      : ponto.cidade + " • " + ponto.pais;

    conteudo.appendChild(selo);
    conteudo.appendChild(titulo);
    conteudo.appendChild(descricao);
    artigo.appendChild(conteudo);

    return artigo;
  }

  function filtrarPontos() {
    var termo = campoBusca ? normalizar(campoBusca.value.trim()) : "";
    var cidadeEscolhida = filtroCidade ? filtroCidade.value : "";
    var encontrados = 0;

    lista.textContent = "";

    pontosTuristicos.forEach(function (ponto) {
      var textoPonto = normalizar(
        ponto.nome + " " + ponto.cidade + " " + ponto.pais
      );

      var combinaBusca = textoPonto.indexOf(termo) !== -1;
      var combinaCidade =
        cidadeEscolhida === "" || ponto.cidade === cidadeEscolhida;

      if (combinaBusca && combinaCidade) {
        lista.appendChild(criarCartao(ponto));
        encontrados++;
      }
    });

    if (aviso) {
      if (encontrados === 0) {
        aviso.textContent = "Nenhum ponto turístico encontrado. Tente outra busca ou escolha outra cidade.";
      } else {
        aviso.textContent = encontrados +
          (encontrados === 1
            ? " ponto turístico encontrado."
            : " pontos turísticos encontrados.");
      }
    }

    console.log("GoTrip: resultados encontrados:", encontrados);
  }

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      filtrarPontos();
    });
  }

  if (campoBusca) {
    campoBusca.addEventListener("input", filtrarPontos);
  }

  if (filtroCidade) {
    filtroCidade.addEventListener("change", filtrarPontos);
  }

  // Recupera a busca feita na página inicial.
  var parametros = new URLSearchParams(window.location.search);
  var buscaInicial = parametros.get("busca");

  if (campoBusca && buscaInicial) {
    campoBusca.value = buscaInicial;
  }

  // Lê a base (arquivo pontos.js ou endereço na internet) e monta a lista.
  if (typeof window.GOTRIP_CARREGAR_PONTOS === "function") {
    window.GOTRIP_CARREGAR_PONTOS().then(function (pontos) {
      pontosTuristicos = pontos;
      preencherCidades();
      filtrarPontos();
    });
  } else {
    lista.textContent = "";
    if (aviso) {
      aviso.textContent = "Faltou carregar o arquivo base-atracoes.js ou pontos.js.";
    }
  }
})();

