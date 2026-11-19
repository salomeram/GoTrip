/* ==========================================================================
   GO TRIP — BASE DAS ATRAÇÕES
   --------------------------------------------------------------------------
   Este arquivo é a "base de dados" do GoTrip.
   É só uma lista: para acrescentar uma atração, copie uma linha, cole abaixo
   e troque o nome, a cidade, o país, a página e o ícone.
   Para tirar uma atração, apague a linha dela.
   Não precisa mexer no script.js nem no style.css.

   Campos de cada atração:
     nome     -> como aparece no cartão
     cidade   -> cidade (usado no filtro de cidades)
     pais     -> país
     id       -> nome curto do lugar (atracao.html?lugar=coliseu)
     pagina   -> não mexa: é sempre "atracao.html?lugar=" + id
     texto    -> parágrafo da página do lugar
     fotoGrande/altFoto -> foto grande da página e a descrição dela
     iconeFa/corIcone   -> ícone mostrado quando não há foto grande
     ingresso, horarios, enderecoCompleto -> caixa de dados da página
     agenda   -> true mostra o botão "Ver na agenda"
     icone    -> emoji mostrado quando não há foto
     descricao-> frase curta que aparece no cartão
     foto     -> endereço da foto; deixe "" para usar o emoji
     tipo     -> etiqueta no mapa (Atração, Bairro, Passeio, Praia...)
     estado   -> cor do marcador no mapa: "verde" aberto,
                 "vermelho" fechado
     endereco -> endereço curto
     lat, lng -> posição no mapa (copie do Google Maps: clique com o botão
                 direito no lugar e copie os dois números)

   No fim do arquivo fica a lista de CIDADES (usada em Destinos e no Mapa).
   O campo "cidade" de cada atração precisa ser igual ao "cidade" da cidade.
   ========================================================================== */

window.PONTOS_TURISTICOS = [
  /* ---------------- ROMA, ITÁLIA ---------------- */
  {
    nome: "Coliseu",
    cidade: "Roma",
    pais: "Itália",
    id: "coliseu",
    pagina: "atracao.html?lugar=coliseu",
    fotoGrande: "https://commons.wikimedia.org/wiki/Special:FilePath/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg?width=600",
    altFoto: "Coliseu de Roma sob o céu azul",
    texto: "O maior anfiteatro da Roma Antiga, um dos pontos mais visitados da Itália.",
    ingresso: "Reserve com antecedência para evitar filas.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: true,
    enderecoCompleto: "Piazza del Colosseo, 1, Roma",
    icone: "🏛️",
    descricao: "Anfiteatro romano de quase 2.000 anos.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Piazza del Colosseo, Roma",
    lat: 41.8902,
    lng: 12.4922
  },
  {
    nome: "Fórum Romano",
    cidade: "Roma",
    pais: "Itália",
    id: "forumromano",
    pagina: "atracao.html?lugar=forumromano",
    fotoGrande: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    altFoto: "Ruínas do Fórum Romano sob o céu azul",
    texto: "Ruínas de templos, arcos e basílicas que formaram o centro político e comercial da Roma Antiga, bem ao lado do Coliseu.",
    ingresso: "Reserve com antecedência. O ingresso costuma incluir também o Coliseu e o Monte Palatino.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: true,
    enderecoCompleto: "Via della Salara Vecchia, 5/6, Roma",
    icone: "🏛️",
    descricao: "Ruínas do centro político da Roma antiga.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Via della Salara Vecchia, Roma",
    lat: 41.8925,
    lng: 12.4853
  },
  {
    nome: "Vaticano",
    cidade: "Roma",
    pais: "Itália",
    id: "vaticano",
    pagina: "atracao.html?lugar=vaticano",
    icone: "⛪",
    descricao: "Basílica de São Pedro e Capela Sistina.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Viale Vaticano, Cidade do Vaticano",
    lat: 41.9022,
    lng: 12.4539
  },
  {
    nome: "Fontana di Trevi",
    cidade: "Roma",
    pais: "Itália",
    id: "fontanaditrevi",
    pagina: "atracao.html?lugar=fontanaditrevi",
    fotoGrande: "https://commons.wikimedia.org/wiki/Special:FilePath/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg?width=600",
    altFoto: "Fontana di Trevi, em Roma",
    texto: "Uma das fontes mais famosas do mundo, no centro histórico de Roma.",
    ingresso: "Confira no site oficial se há regras de acesso à fonte.",
    horarios: "Vá cedo ou à noite para fugir da multidão.",
    agenda: true,
    enderecoCompleto: "Piazza di Trevi, Roma",
    icone: "⛲",
    descricao: "Fonte barroca onde se joga a moeda da sorte.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Piazza di Trevi, Roma",
    lat: 41.9009,
    lng: 12.4833
  },
  {
    nome: "Panteão",
    cidade: "Roma",
    pais: "Itália",
    id: "panteao",
    pagina: "atracao.html?lugar=panteao",
    fotoGrande: "https://commons.wikimedia.org/wiki/Special:FilePath/Rome_Pantheon_front.jpg?width=600",
    altFoto: "Fachada do Panteão, em Roma",
    texto: "Templo romano com a famosa cúpula de concreto, hoje uma igreja.",
    ingresso: "Confira no site oficial se a entrada é paga.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: true,
    enderecoCompleto: "Piazza della Rotonda, Roma",
    icone: "🏛️",
    descricao: "Templo romano com a maior cúpula de concreto do mundo.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Piazza della Rotonda, Roma",
    lat: 41.8986,
    lng: 12.4769
  },
  {
    nome: "Trastevere",
    cidade: "Roma",
    pais: "Itália",
    id: "transtevere",
    pagina: "atracao.html?lugar=transtevere",
    icone: "🍝",
    descricao: "Bairro de ruelas, trattorias e vida noturna.",
    foto: "",
    tipo: "Bairro",
    estado: "verde",
    endereco: "Bairro de Trastevere, Roma",
    lat: 41.8869,
    lng: 12.4700
  },
  {
    nome: "Trattoria do Centro",
    cidade: "Roma",
    pais: "Itália",
    id: "trattoria",
    pagina: "atracao.html?lugar=trattoria",
    icone: "🍽️",
    descricao: "Massas e cozinha romana caseira.",
    foto: "",
    tipo: "Aberto",
    estado: "verde",
    endereco: "Centro histórico, Roma",
    lat: 41.8992,
    lng: 12.4731
  },
  {
    nome: "Museu",
    cidade: "Roma",
    pais: "Itália",
    id: "museu",
    pagina: "atracao.html?lugar=museu",
    corIcone: "mini-laranja",
    iconeFa: "fa-solid fa-building-columns",
    texto: "Museu no centro de Roma, com acervo de arte e história.",
    ingresso: "Confirme o valor no site do museu.",
    horarios: "Confirme o horário no site do museu.",
    agenda: false,
    enderecoCompleto: "Centro histórico, Roma",
    icone: "🖼️",
    descricao: "Acervo de arte e história em pleno centro.",
    foto: "",
    tipo: "Fechado",
    estado: "vermelho",
    endereco: "Centro histórico, Roma",
    lat: 41.8934,
    lng: 12.4828
  },

  /* ---------------- PARIS, FRANÇA ---------------- */
  {
    nome: "Torre Eiffel",
    cidade: "Paris",
    pais: "França",
    id: "torreeiffel",
    pagina: "atracao.html?lugar=torreeiffel",
    icone: "🗼",
    descricao: "Símbolo de Paris, com vista de 324 metros.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Champ de Mars, Paris",
    lat: 48.8584,
    lng: 2.2945
  },
  {
    nome: "Museu do Louvre",
    cidade: "Paris",
    pais: "França",
    id: "louvre",
    pagina: "atracao.html?lugar=louvre",
    corIcone: "mini-verde",
    iconeFa: "fa-solid fa-building-columns",
    texto: "Casa da Mona Lisa e de um dos maiores acervos de arte do mundo.",
    ingresso: "Reserve o horário de entrada pelo site oficial.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: false,
    enderecoCompleto: "Rue de Rivoli, 75001 Paris",
    icone: "🖼️",
    descricao: "O maior museu de arte do mundo.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Rue de Rivoli, Paris",
    lat: 48.8606,
    lng: 2.3376
  },
  {
    nome: "Rio Sena",
    cidade: "Paris",
    pais: "França",
    id: "riosena",
    pagina: "atracao.html?lugar=riosena",
    corIcone: "mini-laranja",
    iconeFa: "fa-solid fa-water",
    texto: "Passeios de barco e margens para caminhar, no centro da cidade.",
    ingresso: "Passeio livre; os passeios de barco são pagos.",
    horarios: "As margens ficam abertas o dia todo; os barcos têm horários próprios.",
    agenda: false,
    enderecoCompleto: "Margens do Sena, Paris",
    icone: "🌊",
    descricao: "Passeio de barco entre pontes e monumentos.",
    foto: "",
    tipo: "Passeio",
    estado: "verde",
    endereco: "Margens do Sena, Paris",
    lat: 48.8570,
    lng: 2.3413
  },

  /* ---------------- LISBOA, PORTUGAL ---------------- */
  {
    nome: "Torre de Belém",
    cidade: "Lisboa",
    pais: "Portugal",
    id: "torredebelem",
    pagina: "atracao.html?lugar=torredebelem",
    icone: "🏰",
    descricao: "Fortaleza manuelina à beira do Tejo.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Av. Brasília, Lisboa",
    lat: 38.6916,
    lng: -9.2160
  },
  {
    nome: "Elétrico 28",
    cidade: "Lisboa",
    pais: "Portugal",
    id: "eletrico28",
    pagina: "atracao.html?lugar=eletrico28",
    icone: "🚋",
    descricao: "Bondinho amarelo pelas ladeiras históricas.",
    foto: "",
    tipo: "Passeio",
    estado: "verde",
    endereco: "Martim Moniz, Lisboa",
    lat: 38.7172,
    lng: -9.1360
  },

  /* ---------------- TÓQUIO, JAPÃO ---------------- */
  {
    nome: "Templo Senso-ji",
    cidade: "Tóquio",
    pais: "Japão",
    id: "sensoji",
    pagina: "atracao.html?lugar=sensoji",
    icone: "⛩️",
    descricao: "O templo mais antigo de Tóquio.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "2-3-1 Asakusa, Tóquio",
    lat: 35.7148,
    lng: 139.7967
  },
  {
    nome: "Shibuya",
    cidade: "Tóquio",
    pais: "Japão",
    id: "shibuya",
    pagina: "atracao.html?lugar=shibuya",
    icone: "🌆",
    descricao: "Cruzamento mais movimentado do mundo.",
    foto: "",
    tipo: "Bairro",
    estado: "verde",
    endereco: "Shibuya, Tóquio",
    lat: 35.6595,
    lng: 139.7005
  },

  /* ---------------- RIO DE JANEIRO, BRASIL ---------------- */
  {
    nome: "Cristo Redentor",
    cidade: "Rio de Janeiro",
    pais: "Brasil",
    id: "cristoredentor",
    pagina: "atracao.html?lugar=cristoredentor",
    texto: "No alto do Corcovado, com vista para a cidade.",
    ingresso: "Reserve o ingresso com antecedência.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: false,
    enderecoCompleto: "Parque Nacional da Tijuca, Alto da Boa Vista, Rio de Janeiro",
    icone: "🗽",
    descricao: "Estátua de 30 metros no topo do Corcovado.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Parque Nacional da Tijuca, Rio de Janeiro",
    lat: -22.9519,
    lng: -43.2105
  },
  {
    nome: "Pão de Açúcar",
    cidade: "Rio de Janeiro",
    pais: "Brasil",
    id: "paodeacucar",
    pagina: "atracao.html?lugar=paodeacucar",
    corIcone: "mini-verde",
    iconeFa: "fa-solid fa-mountain-sun",
    texto: "Passeio de bondinho com vista da baía de Guanabara.",
    ingresso: "Reserve o bondinho pelo site oficial.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: false,
    enderecoCompleto: "Av. Pasteur, 520, Urca, Rio de Janeiro",
    icone: "⛰️",
    descricao: "Bondinho com vista da baía de Guanabara.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Av. Pasteur, Urca, Rio de Janeiro",
    lat: -22.9496,
    lng: -43.1547
  },
  {
    nome: "Praias",
    cidade: "Rio de Janeiro",
    pais: "Brasil",
    id: "praias",
    pagina: "atracao.html?lugar=praias",
    corIcone: "mini-laranja",
    iconeFa: "fa-solid fa-umbrella-beach",
    texto: "Copacabana, Ipanema e muito mais.",
    ingresso: "Acesso livre.",
    horarios: "Abertas o dia todo.",
    agenda: false,
    enderecoCompleto: "Zona Sul, Rio de Janeiro",
    icone: "🏖️",
    descricao: "Copacabana, Ipanema e o calçadão.",
    foto: "",
    tipo: "Praia",
    estado: "verde",
    endereco: "Copacabana, Rio de Janeiro",
    lat: -22.9711,
    lng: -43.1822
  },

  /* ---------------- NOVA YORK, ESTADOS UNIDOS ---------------- */
  {
    nome: "Central Park",
    cidade: "Nova York",
    pais: "Estados Unidos",
    id: "centralpark",
    pagina: "atracao.html?lugar=centralpark",
    texto: "Grande parque no coração de Manhattan.",
    ingresso: "Entrada gratuita.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: false,
    enderecoCompleto: "Manhattan, entre a 59th Street e a 110th Street",
    icone: "🌳",
    descricao: "Parque de 341 hectares no meio de Manhattan.",
    foto: "",
    tipo: "Parque",
    estado: "verde",
    endereco: "Manhattan, Nova York",
    lat: 40.7829,
    lng: -73.9654
  },
  {
    nome: "Broadway",
    cidade: "Nova York",
    pais: "Estados Unidos",
    id: "broadway",
    pagina: "atracao.html?lugar=broadway",
    corIcone: "mini-verde",
    iconeFa: "fa-solid fa-masks-theater",
    texto: "Teatros e musicais perto da Times Square.",
    ingresso: "Compre os ingressos de cada espetáculo com antecedência.",
    horarios: "Cada teatro tem a sua programação.",
    agenda: false,
    enderecoCompleto: "Theater District, Manhattan",
    icone: "🎭",
    descricao: "Teatros e musicais na Times Square.",
    foto: "",
    tipo: "Teatros",
    estado: "verde",
    endereco: "Times Square, Manhattan",
    lat: 40.7590,
    lng: -73.9845
  },
  {
    nome: "Museus de Nova York",
    cidade: "Nova York",
    pais: "Estados Unidos",
    id: "museusny",
    pagina: "atracao.html?lugar=museusny",
    corIcone: "mini-laranja",
    iconeFa: "fa-solid fa-building-columns",
    texto: "Do MET ao MoMA, acervos de arte do mundo todo. O mapa marca o MET.",
    ingresso: "Os valores variam; confira no site de cada museu.",
    horarios: "Confirme o horário atualizado no site oficial antes de ir.",
    agenda: false,
    enderecoCompleto: "MET: 1000 Fifth Avenue. MoMA: 11 West 53rd Street.",
    icone: "🖼️",
    descricao: "Metropolitan, MoMA e Museu de História Natural.",
    foto: "",
    tipo: "Atração",
    estado: "verde",
    endereco: "Fifth Avenue, Manhattan",
    lat: 40.7794,
    lng: -73.9632
  }
];

/* ==========================================================================
   CIDADES — aparecem em destinos.html e mapa.html
     chave    -> nome curto usado no endereço do mapa (mapa.html?cidade=roma)
     cidade   -> igual ao campo "cidade" das atrações acima
     titulo   -> como aparece no cartão
     regiao   -> etiqueta do cartão
     corSelo  -> "selo-verde", "selo-laranja" ou "" (cor da etiqueta)
     foto/alt -> foto do cartão e a descrição dela para leitores de tela
     centro   -> centro do mapa da cidade [lat, lng]
   ========================================================================== */
window.CIDADES_GOTRIP = [
  {
    chave: "roma",
    cidade: "Roma",
    titulo: "Roma, Itália",
    regiao: "Europa",
    corSelo: "selo-verde",
    foto: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=80",
    alt: "Ruínas do Fórum Romano sob o céu azul",
    descricao: "Coliseu, Fórum Romano e gastronomia.",
    pagina: "cidade.html?cidade=roma",
    centro: [41.8902, 12.4922]
  },
  {
    chave: "paris",
    cidade: "Paris",
    titulo: "Paris, França",
    regiao: "Europa",
    corSelo: "selo-verde",
    foto: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80",
    alt: "Torre Eiffel iluminada ao anoitecer em Paris",
    descricao: "Arte, arquitetura e cultura à beira do Sena.",
    pagina: "cidade.html?cidade=paris",
    centro: [48.8584, 2.2945]
  },
  {
    chave: "lisboa",
    cidade: "Lisboa",
    titulo: "Lisboa, Portugal",
    regiao: "Europa",
    corSelo: "selo-verde",
    foto: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=300&q=80",
    alt: "Vista de Lisboa, Portugal",
    descricao: "Miradouros, bondes e pastéis de nata.",
    pagina: "cidade.html?cidade=lisboa",
    centro: [38.7172, -9.1390]
  },
  {
    chave: "toquio",
    cidade: "Tóquio",
    titulo: "Tóquio, Japão",
    regiao: "Ásia",
    corSelo: "selo-laranja",
    foto: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80",
    alt: "Vista de Tóquio, Japão",
    descricao: "Templos, tecnologia e culinária.",
    pagina: "cidade.html?cidade=toquio",
    centro: [35.6870, 139.7500]
  },
  {
    chave: "rio",
    cidade: "Rio de Janeiro",
    titulo: "Rio de Janeiro, Brasil",
    regiao: "Brasil",
    corSelo: "",
    foto: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=300&q=80",
    alt: "Vista do Rio de Janeiro, Brasil",
    descricao: "Praias, Cristo Redentor e Pão de Açúcar.",
    pagina: "cidade.html?cidade=rio",
    centro: [-22.9519, -43.1900]
  },
  {
    chave: "nova-york",
    cidade: "Nova York",
    titulo: "Nova York, EUA",
    regiao: "Américas",
    corSelo: "selo-laranja",
    foto: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=300&q=80",
    alt: "Vista de Nova York, EUA",
    descricao: "Central Park, museus e Broadway.",
    pagina: "cidade.html?cidade=nova-york",
    centro: [40.7700, -73.9750]
  }
];
