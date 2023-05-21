const prognosticoPorEstagio = {
  orofaringe: {
      "Estágio I": {
          comentario: "Corresponde aproximadamente ao estágio 'Localizado' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 62%"
      },
      "Estágio II": {
          comentario: "Corresponde aproximadamente ao estágio 'Regional' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 57%"
      },
      "Estágio III": {
          comentario: "Corresponde aproximadamente ao estágio 'Regional' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 57%"
      },
      "Estágio IV": {
          comentario: "Corresponde aproximadamente ao estágio 'Distante' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 29%"
      }
  },
  hipofaringe: {
      "Estágio I": {
          comentario: "Corresponde aproximadamente ao estágio 'Localizado' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 52%"
      },
      "Estágio II": {
          comentario: "Corresponde aproximadamente ao estágio 'Regional' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 34%"
      },
      "Estágio III": {
          comentario: "Corresponde aproximadamente ao estágio 'Regional' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 34%"
      },
      "Estágio IV": {
          comentario: "Corresponde aproximadamente ao estágio 'Distante' na classificação SEER.",
          taxaSobrevida: "Sobrevida aproximada de 23%"
      }
  },
  nasofaringe: {
    "Estágio I": {
        comentario: "Corresponde aproximadamente ao estágio 'Localizado' na classificação SEER.",
        taxaSobrevida: "Sobrevida aproximada de 81%"
    },
    "Estágio II": {
        comentario: "Corresponde aproximadamente ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida aproximada de 73%"
    },
    "Estágio III": {
        comentario: "Corresponde aproximadamente ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida aproximada de 73%"
    },
    "Estágio IV": {
        comentario: "Corresponde aproximadamente ao estágio 'Distante' na classificação SEER.",
        taxaSobrevida: "Sobrevida aproximada de 48%"
    }
  }
};
const tumores = {
  nasofaringe: [
    { nome: "Carcinoma de células escamosas queratinizado", percentual: "Cerca de 50-70%" },
    { nome: "Carcinoma diferenciado não queratinizado", percentual: "Cerca de 25-50%" },
    { nome: "Linfoma", percentual: "Cerca de 5%" },
    { nome: "Carcinoma Basocelular Escamoso", percentual: "Menor que 5%" },
  ],
  orofaringe: [
    { nome: "Carcinoma de células escamosas", percentual: "Aproximadamente 90%" },
    { nome: "Linfoma", percentual: "Cerca de 5-10%" },
    { nome: "Carcinoma verrucoso", percentual: "Menos de 5%" },
    { nome: "Carcinoma adenoide cístico", percentual: "Menos de 5%" }
  ],
  hipofaringe: [
    { nome: "Carcinoma de células escamosas", percentual: "Aproximadamente 95%" },
    { nome: "Carcinoma adenoide cístico", percentual: "Cerca de 2-3%" },
    { nome: "Carcinoma mucoepidermoide", percentual: "Cerca de 1-2%" }
  ],
};
  
  document.addEventListener('DOMContentLoaded', function () {
    
    const calcularEstagioButton = document.getElementById('calcular-estagio-faringe');
  
    calcularEstagioButton.addEventListener('click', function () {
      const tValue = document.getElementById('t').value;
      const nValue = document.getElementById('n').value;
      const mValue = document.getElementById('m').value;
      const hpvValue = document.getElementById('hpv').value;  
      
      const estagioTumor = calcularEstagioFaringe(tValue, nValue, mValue, hpvValue);
      exibirEstagioTumor(estagioTumor);
  
      const comentarioPrognostico = obterComentarioPrognostico(estagioTumor);
      exibirComentarioPrognostico(comentarioPrognostico);
      // Certifique-se de que a função gerarResumoOpcoes é chamada aqui
      gerarResumoOpcoes();
      
    });
  
    document.getElementById('sublocalizacao').addEventListener('change', function () {
      atualizarOpcoesT(this.value);
    });
  function atualizarOpcoesT(sublocalizacao) {
      const tSelect = document.getElementById('t');
      tSelect.innerHTML = '';
    
      let opcoesT = [];
    
      if (sublocalizacao === 'nasofaringe') {
        opcoesT = [
          { value: 'tx', text: 'Tx - O tumor primário não pode ser avaliado.' },
          { value: 't0', text: 'T0 - Não há evidência de tumor primário.' },
          { value: 'tis', text: 'Tis - Carcinoma in situ.' },
          { value: 't1', text: 'T1 - O tumor é restrito à nasofaringe.' },
          { value: 't2', text: 'T2 - O tumor estende-se à orofaringe e/ou cavidade nasal.' },
          { value: 't3', text: 'T3 - O tumor invade a cavidade nasal e/ou parofaringe e/ou osso ou seio paranasal.' },
          { value: 't4', text: 'T4 - O tumor com invasão intracraniana, nervo craniano, hipofaringe, órbita, com ou sem invasão do seio cavernoso.' }
        ];

        opcoesT.forEach(function (opcao) {
          const opt = document.createElement('option');
          opt.value = opcao.value;
          opt.text = opcao.text;
          tSelect.add(opt);
        });
      } else if (sublocalizacao === 'orofaringe') {
        opcoesT = [
          { value: 'tx', text: 'Tx - O tumor primário não pode ser avaliado.' },
          { value: 't0', text: 'T0 - Não há evidência de tumor primário.' },
          { value: 'tis', text: 'Tis - Carcinoma in situ.' },
          { value: 't1', text: 'T1 - O tumor é de 2 cm ou menos no maior diâmetro.' },
          { value: 't2', text: 'T2 - O tumor é maior que 2 cm, mas não maior que 4 cm no maior diâmetro.' },
          { value: 't3', text: 'T3 - O tumor é maior que 4 cm no maior diâmetro.' },
          { value: 't4', text: 'T4 - O tumor invade os tecidos adjacentes.' }
        ];

        opcoesT.forEach(function (opcao) {
          const opt = document.createElement('option');
          opt.value = opcao.value;
          opt.text = opcao.text;
          tSelect.add(opt);
        });
      } else if (sublocalizacao === 'hipofaringe') {
          opcoesT = [
            { value: 'tx', text: 'Tx - O tumor primário não pode ser avaliado.' },
            { value: 't0', text: 'T0 - Não há evidência de tumor primário.' },
            { value: 'tis', text: 'Tis - Carcinoma in situ.' },
            { value: 't1', text: 'T1 - O tumor está restrito à hipofaringe e/ou se estende até o orifício interno da laringe.' },
            { value: 't2', text: 'T2 - O tumor invade a laringe, ou músculo tireoideu externo.' },
            { value: 't3', text: 'T3 - O tumor invade o osso, cartilagem, músculo ou nervo além da área supra-hióidea da laringe e/ou além do músculo tireoideu externo.' },
            { value: 't4', text: 'T4a - O tumor invade a tireoide/cricóide (subglote), laringe (glote/supraglote), esôfago ou tecido mole do pescoço.' },
            { value: 't4b', text: 'T4b - O tumor invade a pré-vertebral, encasula a carótida, ou apresenta invasão mediastinal.' }
          ];
          opcoesT.forEach(function (opcao) {
            const opt = document.createElement('option');
            opt.value = opcao.value;
            opt.text = opcao.text;
            tSelect.add(opt);
          });
        }
      }

      function calcularEstagioFaringe(t, n, m, hpv) {
        let estagio = '';
    
        // Se o valor de n começa com 'n2', reatribuir o valor 'n2' a n
        if (n.startsWith('n2')) {
            n = 'n2';
        }
    
        if (t === "tx" || n === "nx" || m === "mx") {
            return "Estágio não pode ser definido";
        }
    
        if (t === "tis" && n === "n0" && m === "m0") {
            return "Estágio 0";
        }
    
        if (hpv === 'positivo') {
            if ((['t3', 't4'].includes(t) && ['n0', 'n1', 'n2'].includes(n) && m === 'm0')) {
                estagio = 'Estágio III';
            } else if ((['t1', 't2'].includes(t) && ['n2'].includes(n) && m === 'm0')) {
                estagio = 'Estágio II';
            } else if ((['t1', 't2'].includes(t) && ['n0', 'n1'].includes(n) && m === 'm0')) {
                estagio = 'Estágio I';
            } else if (m === 'm1') {
                estagio = 'Estágio IVA';
            }
        } else {
            if ((t === 't4a' || ['n2', 'n3'].includes(n)) && m === 'm0') {
                estagio = 'Estágio IVA';
            } else if ((['t1', 't2', 't3'].includes(t) && ['n0', 'n1', 'n2'].includes(n) && m === 'm0')) {
                estagio = 'Estágio III';
            } else if (m === 'm1') {
                estagio = 'Estágio IVC';
            }
        }
    
        return estagio || "Estágio não pode ser definido";
    }
    
    
               
    // Primeiro, definimos as funções
      function exibirEstagioTumor(estagioTumor) {
        document.getElementById('estagio-tumor').textContent = estagioTumor;
      }

      function exibirTumoresComuns(sublocalizacao) {
        // Definindo os tumores comuns e suas frequências para cada localização
        
      
        // Obtendo os tumores para a localização especificada
        const tumoresDasubLocalizacao = tumores[sublocalizacao];
      
        // Exibindo os tumores
        let divTumoresComuns = document.getElementById("tumores-comuns");
        divTumoresComuns.innerHTML = "";
      
        for(let tumor of tumoresDasubLocalizacao) {
          divTumoresComuns.innerHTML += `<p>${tumor.nome}: ${tumor.percentual}</p>`;
        }
      }
     
      function gerarResumoOpcoes() {
        const t = document.getElementById('t').value;
        const n = document.getElementById('n').value;
        const m = document.getElementById('m').value;
        const hpv = document.getElementById('hpv').value;  // Adicionando esta linha
        const sublocalizacao = document.getElementById('sublocalizacao').value;
    
        const tValue = t.substr(1);
        const nValue = n.substr(1);
        const mValue = m.substr(1);
        const hpvValue = hpv.substr(0);  // Adicionando esta linha
    
        const sublocalizacaoCapitalizada = sublocalizacao.charAt(0).toUpperCase() + sublocalizacao.slice(1);
    
        const resumo = ` T${tValue} N${nValue} M${mValue} Hpv ${hpvValue} de ${sublocalizacaoCapitalizada}`;
        document.getElementById('resumo-opcoes').innerText = resumo;
    }
    

    function obterComentarioPrognostico(estagioTumor, sublocalizacao) {
      let estagio = estagioTumor;
  
      // transformar os estágios IVA, IVB e IVC em Estágio IV
      if (estagio === "Estágio IVA" || estagio === "Estágio IVB" || estagio === "Estágio IVC") {
          estagio = "Estágio IV";
      }
  
      // Verificar se sublocalizacao e estagio existem no objeto prognosticoPorEstagio
      if (prognosticoPorEstagio.hasOwnProperty(sublocalizacao) && prognosticoPorEstagio[sublocalizacao].hasOwnProperty(estagio)) {
          // buscar as informações corretas no objeto
          return prognosticoPorEstagio[sublocalizacao][estagio];
      } else {
          // retornar uma mensagem de erro ou outro valor padrão
          return "Informações de prognóstico não disponíveis para a sublocalização e estágio fornecidos.";
      }
  }
   
    function exibirComentarioPrognostico(prognosticoPorEstagio) {
      let comentario = prognosticoPorEstagio.comentario;
      document.getElementById('comentario-prognostico').textContent = comentario;
  }

    function exibirTaxaSobrevida(prognosticoPorEstagio) {
        let taxaSobrevida = prognosticoPorEstagio.taxaSobrevida;
        document.getElementById('taxa-sobrevida').textContent = taxaSobrevida;
    }

    function exibirFonte() {
        document.getElementById('fonte').textContent = "Fonte: Surveillance, Epidemiology, and End Results (SEER) Program (www.seer.cancer.gov)";
    }
      

// Em seguida, definimos a parte que trata do evento de click
document.getElementById('calcular-estagio-faringe').addEventListener('click', function() {
  const sublocalizacao = document.getElementById('sublocalizacao').value; // obtenha a sublocalização do elemento do formulário

  let tumoresComuns = tumores[sublocalizacao]; // obtenha os tumores comuns para a sublocalização selecionada

  let divTumoresComuns = document.getElementById("tumores-comuns");
  divTumoresComuns.innerHTML = "";

  for(let tumor of tumoresComuns) {
    divTumoresComuns.innerHTML += `<p>${tumor.nome} - ${tumor.percentual}</p>`;
  }

  const t = document.getElementById('t').value;
  const n = document.getElementById('n').value;
  const m = document.getElementById('m').value;
  const hpv = document.getElementById('hpv').value;

  const estagioTumor = calcularEstagioFaringe(t, n, m, hpv);
  exibirEstagioTumor(estagioTumor);

  const prognostico = obterComentarioPrognostico(estagioTumor, sublocalizacao);
  exibirComentarioPrognostico(prognostico);
  exibirTaxaSobrevida(prognostico);

  // Certifique-se de que a função gerarResumoOpcoes é chamada aqui
  gerarResumoOpcoes();

  exibirTumoresComuns(sublocalizacao);
  exibirFonte();
  console.log(prognosticoPorEstagio);
  console.log(`Sublocalização: ${sublocalizacao}`);
  console.log(`Estágio: ${estagioTumor}`);
  console.log(prognosticoPorEstagio[sublocalizacao]);
});

})