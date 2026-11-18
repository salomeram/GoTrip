
(function () {
  "use strict";

  var pontosTuristicos = [
    // ROMA
    { nome: "Coliseu", cidade: "Roma", pais: "Itália", pagina: "coliseu.html", icone: "🏛️" },
    { nome: "Fórum Romano", cidade: "Roma", pais: "Itália", pagina: "forumromano.html", icone: "🏛️" },
    { nome: "Vaticano", cidade: "Roma", pais: "Itália", pagina: "vaticano.html", icone: "⛪" },
    { nome: "Fontana di Trevi", cidade: "Roma", pais: "Itália", pagina: "fontanaditrevi.html", icone: "⛲" },
    { nome: "Panteão", cidade: "Roma", pais: "Itália", pagina: "panteao.html", icone: "🏛️" },
    { nome: "Trastevere", cidade: "Roma", pais: "Itália", pagina: "transtevere.html", icone: "🍝" },
    { nome: "Trattoria do Centro", cidade: "Roma", pais: "Itália", pagina: "trattoria.html", icone: "🍽️" },
    { nome: "Museu", cidade: "Roma", pais: "Itália", pagina: "museu.html", icone: "🖼️" },

    // PARIS
    { nome: "Torre Eiffel", cidade: "Paris", pais: "França", pagina: "torreeiffel.html", icone: "🗼" },
    { nome: "Museu do Louvre", cidade: "Paris", pais: "França", pagina: "louvre.html", icone: "🖼️" },
    { nome: "Rio Sena", cidade: "Paris", pais: "França", pagina: "riosena.html", icone: "🌊" },

    // LISBOA
    { nome: "Torre de Belém", cidade: "Lisboa", pais: "Portugal", pagina: "torredebelem.html", icone: "🏰" },
    { nome: "Elétrico 28", cidade: "Lisboa", pais: "Portugal", pagina: "eletrico28.html", icone: "🚋" },

    // TÓQUIO
    { nome: "Templo Senso-ji", cidade: "Tóquio", pais: "Japão", pagina: "sensoji.html", icone: "⛩️" },
    { nome: "Shibuya", cidade: "Tóquio", pais: "Japão", pagina: "shibuya.html", icone: "🌆" },

    // RIO DE JANEIRO
    { nome: "Cristo Redentor", cidade: "Rio de Janeiro", pais: "Brasil", pagina: "cristoredentor.html", icone: "🗽" },
    { nome: "Pão de Açúcar", cidade: "Rio de Janeiro", pais: "Brasil", pagina: "paodeacucar.html", icone: "⛰️" },
    { nome: "Praias", cidade: "Rio de Janeiro", pais: "Brasil", pagina: "praias.html", icone: "🏖️" },

    // NOVA YORK
    { nome: "Central Park", cidade: "Nova York", pais: "Estados Unidos", pagina: "centralpark.html", icone: "🌳" },
    { nome: "Broadway", cidade: "Nova York", pais: "Estados Unidos", pagina: "broadway.html", icone: "🎭" },
    { nome: "Museus de Nova York", cidade: "Nova York", pais: "Estados Unidos", pagina: "museusny.html", icone: "🖼️" }
  ];

  var campoBusca = document.getElementById("busca");
  var filtroCidade = document.getElementById("filtro-cidade");
  var lista = document.getElementById("lista-pontos");
  var aviso = document.getElementById("resultado-busca");
  var formulario = document.getElementById("form-busca");

  // Na página inicial não existe a lista de pontos.
  if (!lista) {
    return;
  }

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function criarCartao(ponto) {
    var artigo = document.createElement("article");
    var miniatura = document.createElement("span");
    var conteudo = document.createElement("div");
    var selo = document.createElement("span");
    var titulo = document.createElement("h3");
    var link = document.createElement("a");
    var descricao = document.createElement("p");

    artigo.className = "card-destino";

    miniatura.className = "miniatura";
    miniatura.setAttribute("aria-hidden", "true");
    miniatura.textContent = ponto.icone || "📍";

    selo.className = "selo selo-verde";
    selo.textContent = ponto.cidade;

    link.href = ponto.pagina;
    link.textContent = ponto.nome;

    descricao.textContent = ponto.cidade + " • " + ponto.pais;

    titulo.appendChild(link);
    conteudo.appendChild(selo);
    conteudo.appendChild(titulo);
    conteudo.appendChild(descricao);

    artigo.appendChild(miniatura);
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

  filtrarPontos();
})();
