/* ==========================================================================
   GO TRIP — PÁGINA DE UMA CIDADE (cidade.html?cidade=roma)
   Uma única página para todas as cidades. Os dados vêm do pontos.js.
   ========================================================================== */
(function () {
  "use strict";

  var CORES = ["icone-primaria", "icone-verde", "icone-laranja"];

  document.addEventListener("DOMContentLoaded", function () {
    var chave = new URLSearchParams(window.location.search).get("cidade");
    window.GOTRIP_CARREGAR_CIDADES().then(function (cidades) {
      var cidade = cidades.filter(function (c) { return c.chave === chave; })[0];
      var titulo = document.getElementById("titulo-destino");
      if (!cidade) { titulo.textContent = "Destino não encontrado"; return; }

      document.title = "GoTrip | " + cidade.cidade;
      titulo.textContent = cidade.titulo;

      var selo = document.createElement("p");
      selo.innerHTML = '<span class="selo"></span>';
      selo.firstChild.textContent = cidade.regiao;
      if (cidade.corSelo) selo.firstChild.classList.add(cidade.corSelo);
      titulo.insertAdjacentElement("beforebegin", selo);

      var img = document.createElement("img");
      img.className = "foto-destaque";
      img.src = String(cidade.foto).replace("w=300", "w=600");
      img.alt = cidade.alt || cidade.titulo;
      img.width = 600; img.height = 180;
      var texto = document.createElement("p");
      texto.textContent = cidade.descricao;
      var acoes = document.createElement("div");
      acoes.className = "acoes";
      acoes.innerHTML = '<a class="btn"><i class="fa-solid fa-map-location-dot" aria-hidden="true"></i> </a>';
      acoes.firstChild.href = "mapa.html?cidade=" + encodeURIComponent(cidade.chave);
      acoes.firstChild.appendChild(document.createTextNode("Ver " + cidade.cidade + " no mapa"));
      titulo.insertAdjacentElement("afterend", acoes);
      titulo.insertAdjacentElement("afterend", texto);
      titulo.insertAdjacentElement("afterend", img);

      var lista = document.getElementById("lista-lugares");
      cidade.lugares.forEach(function (lugar, i) {
        var art = document.createElement("article");
        art.className = "card-recurso";
        art.innerHTML = '<span class="icone ' + CORES[i % CORES.length] + '"><i class="' +
          (lugar.iconeFa || "fa-solid fa-landmark") + '" aria-hidden="true"></i></span>' +
          "<div><h3><a></a></h3><p></p></div>";
        var a = art.querySelector("a");
        a.href = lugar.pagina;
        a.textContent = lugar.nome;
        art.querySelector("p").textContent = lugar.descricao || "";
        lista.appendChild(art);
      });
    });
  });
})();
