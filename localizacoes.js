function atualizarOpcoes() {
    const localizacao = document.getElementById("localizacao").value;
    const sublocalizacao = document.getElementById("sublocalizacao");

    // Limpa as opções atuais de "sublocalizacao"
    sublocalizacao.innerHTML = "";
    let opcoesSublocalizacao = [];

    // Definir as opções de sublocalização de acordo com a localização selecionada
    if (localizacao === "laringe") {
      opcoesSublocalizacao = [
        { value: "", text: "Selecione a sublocalização" },
        { value: "glote", text: "Glote" },
        { value: "supraglote", text: "Supraglote" },
        { value: "subglote", text: "Subglote" },
      ];
    } else if (localizacao === "cavidade-oral") {
      opcoesSublocalizacao = [
        { value: "", text: "Selecione a sublocalização" },
        { value: "labio-inferior", text: "Lábio inferior" },
        { value: "labio-superior", text: "Lábio superior" },
        { value: "mucosa-bucal", text: "Mucosa bucal" },
        { value: "gengiva", text: "Gengiva" },
        { value: "palato-duro", text: "Palato duro" },
        { value: "lingua", text: "Língua" },
        { value: "assoalho-bucal", text: "Assoalho bucal" },
        { value: "glandulas-salivares-menores", text: "Glândulas salivares menores" },
      ];
    } else if (localizacao === "faringe") {
      opcoesSublocalizacao = [
        { value: "", text: "Selecione a sublocalização" },
        { value: "nasofaringe", text: "Nasofaringe" },
        { value: "orofaringe", text: "Orofaringe" },
        { value: "hipofaringe", text: "Hipofaringe" },
      ];
    } else if (localizacao === "pele") {
      opcoesSublocalizacao = [
        { value: "", text: "Selecione a sublocalização" },
        { value: "couro-cabeludo", text: "Couro cabeludo" },
        { value: "face", text: "Face" },
        { value: "pescoco", text: "Pescoço" },
      ];
    } else if (localizacao === "glandulas-salivares") {
      opcoesSublocalizacao = [
        { value: "", text: "Selecione a sublocalização" },
        { value: "parotida", text: "Parótida" },
        { value: "submandibular", text: "Submandibular" },
        { value: "sublingual", text: "Sublingual" },
        { value: "menores", text: "Menores" },
     ];
    }
    // Adicionar as opções de sublocalização ao elemento select "sublocalizacao"
  opcoesSublocalizacao.forEach((opcao) => {
    const opt = document.createElement("option");
    opt.value = opcao.value;
    opt.text = opcao.text;
    sublocalizacao.add(opt);
  });
  const localizacaoSelect = document.getElementById("localizacao");
    localizacaoSelect.addEventListener("change", atualizarOpcoes);
}





//preciso fazer o "t1a" e "t1b" virarem apenas "t1 " para efeitos de calculo da função com estagio do tumor.