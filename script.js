// GoTrip - busca e filtro de pontos turísticos
// Os dados de todos os pontos ficam centralizados neste array.
(function () {
  "use strict";

  var pontosTuristicos = [
    { nome: "Coliseu", cidade: "Roma", pais: "Itália", pagina: "coliseu.html" },
    { nome: "Fórum Romano", cidade: "Roma", pais: "Itália", pagina: "forumromano.html" },
    { nome: "Vaticano", cidade: "Roma", pais: "Itália", pagina: "vaticano.html" },
    { nome: "Fontana di Trevi", cidade: "Roma", pais: "Itália", pagina: "fontanaditrevi.html" },
    { nome: "Panteão", cidade: "Roma", pais: "Itália", pagina: "panteao.html" },
    { nome: "Trastevere", cidade: "Roma", pais: "Itália", pagina: "transtevere.html" },
    { nome: "Trattoria do Centro", cidade: "Roma", pais: "Itália", pagina: "trattoria.html" },
    { nome: "Museu", cidade: "Roma", pais: "Itália", pagina: "museu.html" },

    { nome: "Torre Eiffel", cidade: "Paris", pais: "França", pagina: "torreeiffel.html" },
    { nome: "Museu do Louvre", cidade: "Paris", pais: "França", pagina: "louvre.html" },
    { nome: "Rio Sena", cidade: "Paris", pais: "França", pagina: "riosena.html" },

    { nome: "Torre de Belém", cidade: "Lisboa", pais: "Portugal", pagina: "torredebelem.html" },
    { nome: "Elétrico 28", cidade: "Lisboa", pais: "Portugal", pagina: "eletrico28.html" },

    { nome: "Templo Senso-ji", cidade: "Tóquio", pais: "Japão", pagina: "sensoji.html" },
    { nome: "Shibuya", cidade: "Tóquio", pais: "Japão", pagina: "shibuya.html" },

    { nome: "Cristo Redentor", cidade: "Rio de Janeiro", pais: "Brasil", pagina: "cristoredentor.html" },
    { nome: "Pão de Açúcar", cidade: "Rio de Janeiro", pais: "Brasil", pagina: "paodeacucar.html" },
    { nome: "Praias", cidade: "Rio de Janeiro", pais: "Brasil", pagina: "praias.html" },

    { nome: "Central Park", cidade: "Nova York", pais: "Estados Unidos", pagina: "centralpark.html" },
    { nome: "Broadway", cidade: "Nova York", pais: "Estados Unidos", pagina: "broadway.html" },
    { nome: "Museus de Nova York", cidade: "Nova York", pais: "Estados Unidos", pagina: "museusny.html" }
  ];

  var campoBusca = document.getElementById("busca");
  var filtroCidade = document.getElementById("filtro-cidade");
  var lista = document.getElementById("lista-pontos");
  var aviso = document.getElementById("resultado-busca");
  var formulario = document.getElementById("form-busca");

  // O script também é carregado em páginas que não possuem a lista de pontos.
  if (!lista) {
    return;
  }

  if (!Array.isArray(pontosTuristicos) || pontosTuristicos.length === 0) {
    console.error("GoTrip: não foi possível carregar os pontos turísticos. Verifique o array pontosTuristicos.");
    if (aviso) aviso.textContent = "Não foi possível carregar os pontos turísticos.";
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
    var conteudo = document.createElement("div");
    var selo = document.createElement("span");
    var titulo = document.createElement("h3");
    var link = document.createElement("a");
    var descricao = document.createElement("p");

    artigo.className = "card-destino";
    selo.className = "selo selo-verde";
    selo.textContent = ponto.cidade;
    link.href = ponto.pagina;
    link.textContent = ponto.nome;
    descricao.textContent = ponto.cidade + ", " + ponto.pais;

    titulo.appendChild(link);
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
      if (!ponto || !ponto.nome || !ponto.cidade || !ponto.pagina) {
        console.error("GoTrip: existe um ponto turístico com dados incompletos.", ponto);
        return;
      }

      var textoPonto = normalizar(ponto.nome + " " + ponto.cidade + " " + ponto.pais);
      var combinaBusca = textoPonto.indexOf(termo) !== -1;
      var combinaCidade = cidadeEscolhida === "" || ponto.cidade === cidadeEscolhida;

      if (combinaBusca && combinaCidade) {
        lista.appendChild(criarCartao(ponto));
        encontrados++;
      }
    });

    if (aviso) {
      if (encontrados === 0) {
        aviso.textContent = "Nenhum ponto turístico encontrado. Tente outra busca ou escolha outra cidade.";
      } else {
        aviso.textContent = encontrados + (encontrados === 1
          ? " ponto turístico encontrado."
          : " pontos turísticos encontrados.");
      }
    }
  }

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      filtrarPontos();
    });
  } else {
    console.error("GoTrip: o formulário de busca não foi encontrado nesta página.");
  }

  if (campoBusca) {
    campoBusca.addEventListener("input", filtrarPontos);
  } else {
    console.error("GoTrip: o campo de busca #busca não foi encontrado.");
  }

  if (filtroCidade) {
    filtroCidade.addEventListener("change", filtrarPontos);
  } else {
    console.error("GoTrip: o filtro #filtro-cidade não foi encontrado.");
  }

  // Recupera a busca enviada pela página inicial, se houver.
  var parametros = new URLSearchParams(window.location.search);
  var buscaInicial = parametros.get("busca");

  if (campoBusca && buscaInicial) {
    campoBusca.value = buscaInicial;
  }

  filtrarPontos();
})();
