/* GoTrip - Agenda (calendário e atividades) */
(function () {
  "use strict";


  function iniciarAgenda() {
    var calendario = document.getElementById("calendario");
    var tituloMes = document.getElementById("cal-mes");
    var antes = document.getElementById("cal-antes");
    var depois = document.getElementById("cal-depois");
    var hojeBtn = document.getElementById("cal-hoje");
    var painel = document.getElementById("dia-selecionado");
    var aviso = document.getElementById("agenda-aviso");
    if (!calendario || !tituloMes || !antes || !depois || !hojeBtn || !painel) return;

    var chave = "gotrip-agenda";
    var nomesMes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var nomesDia = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    var diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
    var hoje = new Date();
    var ano = hoje.getFullYear();
    var mes = hoje.getMonth();
    var selecionado = dataISO(hoje);

    var locais = {
      "roma": ["Coliseu", "Fontana di Trevi", "Panteão", "Fórum Romano", "Piazza Navona", "Vaticano"],
      "italia": ["Coliseu — Roma", "Fontana di Trevi — Roma", "Panteão — Roma", "Torre de Pisa — Pisa", "Duomo — Milão", "Canais de Veneza — Veneza"],
      "paris": ["Torre Eiffel", "Museu do Louvre", "Arco do Triunfo", "Catedral de Notre-Dame", "Montmartre", "Jardins de Luxemburgo"],
      "franca": ["Torre Eiffel — Paris", "Museu do Louvre — Paris", "Palácio de Versalhes — Versalhes", "Arco do Triunfo — Paris", "Mont Saint-Michel"],
      "londres": ["Big Ben", "London Eye", "Tower Bridge", "Museu Britânico", "Palácio de Buckingham", "Hyde Park"],
      "inglaterra": ["Big Ben — Londres", "Tower Bridge — Londres", "Museu Britânico — Londres", "Stonehenge"],
      "lisboa": ["Torre de Belém", "Mosteiro dos Jerónimos", "Castelo de São Jorge", "Praça do Comércio", "Elevador de Santa Justa"],
      "portugal": ["Torre de Belém — Lisboa", "Castelo de São Jorge — Lisboa", "Palácio da Pena — Sintra", "Livraria Lello — Porto", "Ribeira — Porto"],
      "tokyo": ["Templo Senso-ji", "Shibuya Crossing", "Tokyo Skytree", "Meiji Jingu", "Akihabara", "Parque Ueno"],
      "japao": ["Templo Senso-ji — Tóquio", "Shibuya Crossing — Tóquio", "Monte Fuji", "Fushimi Inari — Kyoto", "Castelo de Osaka"],
      "rio de janeiro": ["Cristo Redentor", "Pão de Açúcar", "Praia de Copacabana", "Escadaria Selarón", "Jardim Botânico"],
      "rio": ["Cristo Redentor", "Pão de Açúcar", "Praia de Copacabana", "Escadaria Selarón", "Jardim Botânico"],
      "brasil": ["Cristo Redentor — Rio de Janeiro", "Pão de Açúcar — Rio de Janeiro", "Pelourinho — Salvador", "Lençóis Maranhenses", "Cataratas do Iguaçu"],
      "nova york": ["Central Park", "Estátua da Liberdade", "Times Square", "Empire State Building", "Brooklyn Bridge"],
      "new york": ["Central Park", "Estátua da Liberdade", "Times Square", "Empire State Building", "Brooklyn Bridge"],
      "estados unidos": ["Central Park — Nova York", "Estátua da Liberdade — Nova York", "Grand Canyon", "Golden Gate — San Francisco", "Hollywood Sign — Los Angeles"],
      "madrid": ["Museu do Prado", "Palácio Real", "Parque do Retiro", "Plaza Mayor", "Puerta del Sol"],
      "espanha": ["Museu do Prado — Madrid", "Sagrada Família — Barcelona", "Alhambra — Granada", "Plaza de España — Sevilha"],
      "barcelona": ["Sagrada Família", "Park Güell", "Casa Batlló", "La Rambla", "Barceloneta"],
      "amsterdam": ["Casa de Anne Frank", "Museu Van Gogh", "Rijksmuseum", "Vondelpark", "Canais de Amsterdam"],
      "holanda": ["Casa de Anne Frank — Amsterdam", "Museu Van Gogh — Amsterdam", "Rijksmuseum — Amsterdam", "Moinhos de Kinderdijk"],
      "berlim": ["Portão de Brandemburgo", "Muro de Berlim", "Reichstag", "Ilha dos Museus", "Memorial do Holocausto"],
      "alemanha": ["Portão de Brandemburgo — Berlim", "Castelo de Neuschwanstein", "Catedral de Colônia", "Ilha dos Museus — Berlim"],
      "santiago": ["Cerro San Cristóbal", "Palácio de La Moneda", "Plaza de Armas", "Sky Costanera", "Museu da Memória"],
      "chile": ["Cerro San Cristóbal — Santiago", "Valle de la Luna — Atacama", "Torres del Paine", "Sky Costanera — Santiago"]
    };


    function dataISO(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
    function normalizar(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
    function avisoTexto(msg) { if (aviso) { aviso.textContent = msg; aviso.hidden = !msg; } }
    function ler() {
      try { var o = JSON.parse(localStorage.getItem(chave) || "{}"); return o && typeof o === "object" ? o : {}; }
      catch (e) { avisoTexto("Não foi possível ler os dados salvos. A agenda está vazia."); return {}; }
    }
    function salvar(o) {
      try { localStorage.setItem(chave, JSON.stringify(o)); avisoTexto(""); return true; }
      catch (e) { avisoTexto("Não foi possível salvar. Abra o site pelo Live Server e tente novamente."); return false; }
    }
    function sugerir(destino) {
      var texto = normalizar(destino);
      if (!texto) return [];
      var partes = texto.split(",").map(function (p) { return p.trim(); });
      var cidade = partes[0] || texto;
      var pais = partes.length > 1 ? partes[partes.length - 1] : "";
      if (locais[cidade]) return locais[cidade];
      var chaveCidade = Object.keys(locais).find(function (k) { return k.length > 2 && (cidade === k || cidade.indexOf(k) !== -1 || k.indexOf(cidade) !== -1); });
      if (chaveCidade) return locais[chaveCidade];
      if (pais && locais[pais]) return locais[pais];
      var chavePais = pais && Object.keys(locais).find(function (k) { return pais === k || pais.indexOf(k) !== -1 || k.indexOf(pais) !== -1; });
      if (chavePais) return locais[chavePais];
      var chaveDestino = Object.keys(locais).find(function (k) { return texto === k || texto.indexOf(k) !== -1 || k.indexOf(texto) !== -1; });
      return chaveDestino ? locais[chaveDestino] : [];
    }

    function renderCalendario() {
      calendario.replaceChildren();
      tituloMes.textContent = nomesMes[mes] + " de " + ano;
      diasSemana.forEach(function (dia) { var el = document.createElement("div"); el.className = "cal-cabeca"; el.textContent = dia; el.setAttribute("aria-hidden", "true"); calendario.appendChild(el); });
      var primeiro = new Date(ano, mes, 1).getDay();
      var total = new Date(ano, mes + 1, 0).getDate();
      var dados = ler();
      for (var vazio = 0; vazio < primeiro; vazio++) { var v = document.createElement("div"); v.className = "cal-vazio"; v.setAttribute("aria-hidden", "true"); calendario.appendChild(v); }
      for (var n = 1; n <= total; n++) {
        var dia = dataISO(new Date(ano, mes, n));
        var b = document.createElement("button"); b.type = "button"; b.className = "cal-dia"; b.dataset.data = dia; b.textContent = n;
        var eventos = Array.isArray(dados[dia]) ? dados[dia] : [];
        if (eventos.length) { b.classList.add("tem-evento"); var badge = document.createElement("span"); badge.className = "cal-marca"; badge.textContent = eventos.length; b.appendChild(badge); }
        if (dia === selecionado) { b.classList.add("selecionado"); b.setAttribute("aria-current", "date"); }
        if (dia === dataISO(new Date())) b.classList.add("hoje");
        calendario.appendChild(b);
      }
    }

    function renderPainel() {
      painel.replaceChildren();
      var pedacos = selecionado.split("-").map(Number);
      var d = new Date(pedacos[0], pedacos[1] - 1, pedacos[2]);
      var dados = ler(); var eventos = Array.isArray(dados[selecionado]) ? dados[selecionado] : [];
      var h2 = document.createElement("h2"); h2.id = "titulo-dia"; h2.textContent = nomesDia[d.getDay()] + ", " + d.getDate() + " de " + nomesMes[d.getMonth()] + " de " + d.getFullYear(); painel.appendChild(h2);

      var form = document.createElement("form"); form.className = "formulario agenda-form"; form.setAttribute("aria-labelledby", "titulo-dia");
      var campoAtividade = document.createElement("div"); campoAtividade.className = "campo";
      var labelAtividade = document.createElement("label"); labelAtividade.htmlFor = "ev-titulo"; labelAtividade.textContent = "Atividade";
      var inputAtividade = document.createElement("input"); inputAtividade.id = "ev-titulo"; inputAtividade.type = "text"; inputAtividade.placeholder = "Ex.: Visitar o Coliseu"; inputAtividade.required = true;
      campoAtividade.append(labelAtividade, inputAtividade);
      var linha = document.createElement("div"); linha.className = "agenda-form-linha";
      var campoHora = document.createElement("div"); campoHora.className = "campo"; var labelHora = document.createElement("label"); labelHora.htmlFor = "ev-hora"; labelHora.textContent = "Hora"; var inputHora = document.createElement("input"); inputHora.type = "time"; inputHora.id = "ev-hora"; inputHora.value = "09:00"; campoHora.append(labelHora, inputHora);
      var campoLugar = document.createElement("div"); campoLugar.className = "campo"; var labelLugar = document.createElement("label"); labelLugar.htmlFor = "ev-lugar"; labelLugar.textContent = "Cidade ou país"; var inputLugar = document.createElement("input"); inputLugar.type = "text"; inputLugar.id = "ev-lugar"; inputLugar.placeholder = "Ex.: Roma, Itália"; campoLugar.append(labelLugar, inputLugar); linha.append(campoHora, campoLugar);
      var caixaSug = document.createElement("div"); caixaSug.className = "sugestoes-turisticas"; caixaSug.hidden = true; var tituloSug = document.createElement("p"); tituloSug.className = "sugestoes-titulo"; tituloSug.textContent = "Pontos turísticos sugeridos"; var listaSug = document.createElement("div"); listaSug.className = "sugestoes-lista"; caixaSug.append(tituloSug, listaSug);
      var adicionar = document.createElement("button"); adicionar.type = "submit"; adicionar.textContent = "Adicionar ao calendário";
      form.append(campoAtividade, linha, caixaSug, adicionar);
      inputLugar.addEventListener("input", function () {
        listaSug.replaceChildren(); var achados = sugerir(inputLugar.value);
        caixaSug.hidden = achados.length === 0;
        achados.forEach(function (ponto) { var b = document.createElement("button"); b.type = "button"; b.className = "sugestao-turistica"; b.textContent = ponto; b.addEventListener("click", function () { var nome = ponto.split(" — ")[0]; inputAtividade.value = "Visitar " + nome; inputLugar.value = ponto.indexOf(" — ") >= 0 ? ponto.split(" — ")[1] : inputLugar.value; caixaSug.hidden = true; inputAtividade.focus(); }); listaSug.appendChild(b); });
      });
      form.addEventListener("submit", function (ev) { ev.preventDefault(); var titulo = inputAtividade.value.trim(); if (!titulo) return; var atuais = ler(); if (!Array.isArray(atuais[selecionado])) atuais[selecionado] = []; atuais[selecionado].push({ titulo: titulo, hora: inputHora.value, lugar: inputLugar.value.trim() }); if (salvar(atuais)) { renderCalendario(); renderPainel(); } });
      painel.appendChild(form);

      var lista = document.createElement("ul"); lista.className = "agenda-lista";
      if (!eventos.length) { var vazio = document.createElement("li"); vazio.className = "agenda-vazio"; vazio.textContent = "Nenhuma atividade neste dia ainda."; lista.appendChild(vazio); }
      eventos.forEach(function (evento, indice) { var li = document.createElement("li"); var texto = document.createElement("div"); var nome = document.createElement("p"); nome.className = "destino-agenda"; nome.textContent = evento.titulo || "Atividade"; var detalhe = document.createElement("p"); detalhe.className = "horario"; detalhe.textContent = (evento.hora || "Sem horário") + (evento.lugar ? " • " + evento.lugar : ""); texto.append(nome, detalhe); var remover = document.createElement("button"); remover.type = "button"; remover.className = "agenda-tirar"; remover.textContent = "Tirar"; remover.addEventListener("click", function () { var atual = ler(); if (!Array.isArray(atual[selecionado])) return; atual[selecionado].splice(indice, 1); if (!atual[selecionado].length) delete atual[selecionado]; if (salvar(atual)) { renderCalendario(); renderPainel(); } }); li.append(texto, remover); lista.appendChild(li); });
      painel.appendChild(lista);
    }

    calendario.addEventListener("click", function (ev) { var btn = ev.target.closest("button.cal-dia"); if (!btn || !calendario.contains(btn)) return; selecionado = btn.dataset.data; renderCalendario(); renderPainel(); });
    antes.addEventListener("click", function () { mes--; if (mes < 0) { mes = 11; ano--; } renderCalendario(); });
    depois.addEventListener("click", function () { mes++; if (mes > 11) { mes = 0; ano++; } renderCalendario(); });
    hojeBtn.addEventListener("click", function () { hoje = new Date(); ano = hoje.getFullYear(); mes = hoje.getMonth(); selecionado = dataISO(hoje); renderCalendario(); renderPainel(); });
    renderCalendario(); renderPainel();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciarAgenda, { once: true });
  else iniciarAgenda();
})();
