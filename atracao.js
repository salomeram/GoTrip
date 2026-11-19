/* ==========================================================================
   GO TRIP — PÁGINA DE UM LUGAR (atracao.html?lugar=coliseu)
   Uma única página para TODAS as atrações. Os textos vêm do pontos.js.
   Para criar um lugar novo, basta acrescentá-lo no pontos.js.
   ========================================================================== */
(function () {
  "use strict";

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  }

  function botao(href, icone, texto, secundario) {
    var a = el("a", secundario ? "btn btn-secundario" : "btn");
    a.href = href;
    a.innerHTML = '<i class="fa-solid ' + icone + '" aria-hidden="true"></i> ';
    a.appendChild(document.createTextNode(texto));
    return a;
  }

  function mostrar(lugar, cidade) {
    var secao = document.getElementById("lugar");
    var titulo = document.getElementById("titulo-lugar");
    document.title = "GoTrip | " + lugar.nome;
    titulo.textContent = lugar.nome;

    if (cidade) {
      var voltar = secao.querySelector(".voltar");
      voltar.href = cidade.pagina;
      voltar.querySelector("span").textContent = "Voltar para " + cidade.cidade;
    }

    var depois = titulo;
    function por(e) { depois.insertAdjacentElement("afterend", e); depois = e; }

    if (lugar.fotoGrande) {
      var img = el("img", "foto-destaque");
      img.src = lugar.fotoGrande;
      img.alt = lugar.altFoto || lugar.nome;
      img.width = 600; img.height = 180;
      por(img);
    } else {
      var mini = el("div", "foto-destaque miniatura " + (lugar.corIcone || "mini-verde"));
      mini.setAttribute("aria-hidden", "true");
      mini.innerHTML = '<i class="' + (lugar.iconeFa || "fa-solid fa-location-dot") + '"></i>';
      por(mini);
    }

    por(el("p", "", lugar.texto || lugar.descricao || ""));

    if (lugar.estado === "vermelho") {
      var aviso = el("p", "aviso");
      aviso.innerHTML = '<i class="fa-solid fa-door-closed" aria-hidden="true"></i><span>Este lugar está fechado no momento.</span>';
      por(aviso);
    }

    var dados = el("dl", "dados cartao");
    [["Endereço", lugar.enderecoCompleto || lugar.endereco],
     ["Ingresso", lugar.ingresso || "Confirme o valor no site oficial."],
     ["Horários", lugar.horarios || "Confirme o horário no site oficial antes de ir."]
    ].forEach(function (par) {
      if (!par[1]) return;
      var d = el("div");
      d.appendChild(el("dt", "", par[0]));
      d.appendChild(el("dd", "", par[1]));
      dados.appendChild(d);
    });
    por(dados);

    var acoes = el("div", "acoes");
    if (cidade && typeof lugar.lat === "number") {
      acoes.appendChild(botao("mapa.html?cidade=" + encodeURIComponent(cidade.chave) +
        "&lugar=" + encodeURIComponent(lugar.id), "fa-map-location-dot", "Ver no mapa"));
    }
    if (lugar.agenda) {
      acoes.appendChild(botao("agenda.html", "fa-calendar-check", "Ver na agenda", true));
    }
    por(acoes);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var id = new URLSearchParams(window.location.search).get("lugar");
    Promise.all([window.GOTRIP_CARREGAR_PONTOS(), window.GOTRIP_CARREGAR_CIDADES()])
      .then(function (r) {
        var lugar = r[0].filter(function (p) { return p.id === id; })[0];
        if (!lugar) {
          document.getElementById("titulo-lugar").textContent = "Lugar não encontrado";
          return;
        }
        var cidade = r[1].filter(function (c) { return c.cidade === lugar.cidade; })[0];
        mostrar(lugar, cidade);
      });
  });
})();
