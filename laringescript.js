const prognosticoPorEstagio = {
  laringe: {
    I: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio I é de aproximadamente 75%.",
    II: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio II é de aproximadamente 60%.",
    III: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio III é de aproximadamente 55%.",
    IVA: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio IVA varia de 35% a 45%.",
    IVB: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio IVB é de aproximadamente 25%.",
    IVC: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio IVC é de aproximadamente 10%.",
  },
};

document.addEventListener('DOMContentLoaded', function () {
  
  const calcularEstagioButton = document.getElementById('calcular-estagio-laringe');

  calcularEstagioButton.addEventListener('click', function () {
    const tValue = document.getElementById('t').value;
    const nValue = document.getElementById('n').value;
    const mValue = document.getElementById('m').value;

    
    const estagioTumor = calcularEstagioLaringe(tValue, nValue, mValue);
    exibirEstagioTumor(estagioTumor);

    const comentarioPrognostico = obterComentarioPrognostico(estagioTumor);
    exibirComentarioPrognostico(comentarioPrognostico);
    // Aqui é onde você chama a função gerarResumoOpcoes
    gerarResumoOpcoes();
  });

  document.getElementById('sublocalizacao').addEventListener('change', function () {
    atualizarOpcoesT(this.value);
  });
  function atualizarOpcoesT(sublocalizacao) {
    const tSelect = document.getElementById('t');
    tSelect.innerHTML = '';

    if (sublocalizacao === 'glote') {
      const opcoesT = [
        { value: 'tx', text: 'Tx - O tumor primário não pode ser avaliado.' },
        { value: 't1a', text: 'T1a - Tumor limitado a uma corda vocal, com mobilidade normal' },
        { value: 't1b', text: 'T1b - Tumor invade ambas as cordas vocais, com mobilidade normal' },
        { value: 't2', text: 'T2 - Tumor invade a laringe extrínseca ou diminui a mobilidade da(s) corda(s) vocal(is)' },
        { value: 't3', text: 'T3 - Tumor limitado à laringe com fixação da(s) corda(s) vocal(is)' },
        { value: 't4a', text: 'T4a - Tumor invade a cartilagem tireoide, a laringe extrínseca, ou ambas' },
        { value: 't4b', text: 'T4b - Tumor invade a coluna cervical através da cartilagem cricoide ou a cartilagem tireoide ou a parede posterior da faringe' }
      ];

      opcoesT.forEach(function (opcao) {
        const opt = document.createElement('option');
        opt.value = opcao.value;
        opt.text = opcao.text;
        tSelect.add(opt);
      });
    } else if (sublocalizacao === 'supraglote') {
      const opcoesT = [
        { value: 'tx', text: 'Tx - O tumor primário não pode ser avaliado.' },
        { value: 't1', text: 'T1 - Tumor limitado à supraglote unifocal com normalidade das cordas vocais' },
        { value: 't2', text: 'T2 - Tumor invade a mucosa de mais de um subsítio supraglótico ou região glótica, ou uma área supraglótica menor ou igual a 1 cm em maior dimensão, sem fixação das cordas vocais' },
        { value: 't3', text: 'T3 - Tumor limitado à laringe com fixação da(s) corda(s) vocal(is) ou tumor com extensão até a região pré-epiglótica ou paraglote, ou ambos, sem fixação das cordas vocais' },
        { value: 't4a', text: 'T4a - Tumor invade a cartilagem tireoide ou extrínseca da laringe, ou ambos (por exemplo, através do ligamento tireoepiglótico, ou através da cartilagem tireoide, ou da laringe extrínseca) com ou sem fixação das cordas vocais' },
        { value: 't4b', text: 'T4b - Tumor invade tecidos pré-vertebrais, cartilagem cricoide, ou a parede posterior da faringe' }
      ];

      opcoesT.forEach(function (opcao) {
        const opt = document.createElement('option');
        opt.value = opcao.value;
        opt.text = opcao.text;
        tSelect.add(opt);
      });
    } else if (sublocalizacao === 'subglote') {
      const opcoesT = [
        { value: 'tx', text: 'Tx - O tumor primário não pode ser avaliado.' },
        { value: 't1', text: 'T1 - Tumor limitado à subglote' },
        { value: 't2', text: 'T2 - Tumor invade a laringe extrínseca' },
        { value: 't3', text: 'T3 - Tumor limitado à laringe com fixação da(s) corda(s) vocal(is)' },
        { value: 't4a', text: 'T4a - Tumor invade a cartilagem tireoide, a laringe extrínseca, ou ambas' },
        { value: 't4b', text: 'T4b - Tumor invade a coluna cervical através da cartilagem cricoide ou a cartilagem tireoide ou a parede posterior da faringe' }
      ];

      opcoesT.forEach(function (opcao) {
        const opt = document.createElement('option');
        opt.value = opcao.value;
        opt.text = opcao.text;
        tSelect.add(opt);
      });
    }
  }
  
  function calcularEstagioLaringe(t, n, m) {
    let estagio = "";

    // Adicionando condição para Tx, Nx ou Mx
    if (t === "tx" || n === "nx" || m === "mx") {
    return "Estágio não pode ser definido";
    }

    if (m === "m1") {
      estagio = "Estágio IVC";
    } else {
      switch (t) {
        case "t1a":
        case "t1":
        case "t1b":
        case "t2":
          if (n === "n0") {
            estagio = "Estágio I";
          } else if (n === "n1") {
            estagio = "Estágio II";
          } else {
            estagio = "Estágio III";
          }
          break;
        case "t3":
          if (n === "n0" || n === "n1") {
            estagio = "Estágio III";
          } else {
            estagio = "Estágio IVA";
          }
          break;
        case "t4a":
          if (n === "n0" || n === "n1" || n === "n2a" || n === "n2b" || n === "n2c" || n === "n3") {
            estagio = "Estágio IVA";
          } else {
            estagio = "Estágio IVB";
          }
          break;
        case "t4b":
          estagio = "Estágio IVB";
          break;
        default:
          break;
      }
    }

    return estagio;
  }
  function exibirEstagioTumor(estagioTumor) {
    document.getElementById('estagio-tumor').textContent = estagioTumor;
  }
});

function gerarResumoOpcoes() {
  const t = document.getElementById('t').value;
  const n = document.getElementById('n').value;
  const m = document.getElementById('m').value;
  const sublocalizacao = document.getElementById('sublocalizacao').value;

  // Remove the leading letter from each value.
  const tValue = t.substr(1);
  const nValue = n.substr(1);
  const mValue = m.substr(1);

  // Capitalize the first letter of the sublocation.
  const sublocalizacaoCapitalizada = sublocalizacao.charAt(0).toUpperCase() + sublocalizacao.slice(1);

  const resumo = ` T${tValue} N${nValue} M${mValue} clínico de ${sublocalizacaoCapitalizada}`;
  // Supondo que você tenha uma div com o id 'resumo-opcoes' onde você deseja exibir o resumo
  document.getElementById('resumo-opcoes').innerText = resumo;
}
function obterComentarioPrognostico(estagioTumor) {
    // Extraindo o número do estágio a partir da string estagioTumor.
    const estagio = estagioTumor.split(' ')[1];
    // Retorna o prognóstico correspondente ao estágio do tumor.
    return prognosticoPorEstagio.laringe[estagio];
}

function exibirComentarioPrognostico(comentarioPrognostico) {
    // Exibe o comentário do prognóstico em algum lugar do seu HTML.
    document.getElementById('comentario-prognostico').textContent = comentarioPrognostico;
}

document.getElementById("calcular-estagio-laringe").addEventListener("click", function() {
  const tumoresComuns = [
    { nome: "1 - Carcinoma de células escamosas", percentual:"Aproximadamente 90%" },
    { nome: "2 - Carcinoma verrucoso", percentual: "Aproximadamente 3-5%" },
    { nome: "3 - Carcinoma adenoide cístico", percentual: "Aproximadamente 2-3%" },
    { nome: "4 - Carcinoma mucoepidermoide", percentual: "Aproximadamente 1-2%" },
    { nome: "5 - Carcinoma indiferenciado", percentual: "Aproximadamente <1%" },
  ];
  
  let divTumoresComuns = document.getElementById("tumores-comuns");
  divTumoresComuns.innerHTML = "";

  for(let tumor of tumoresComuns) {
    divTumoresComuns.innerHTML += `<p>${tumor.nome} - ${tumor.percentual}</p>`;
  }
});



