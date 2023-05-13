console.log("Script carregado");
document.addEventListener("DOMContentLoaded", function () {
  const localizacao = document.getElementById("localizacao");
  const sublocalizacao = document.getElementById("sublocalizacao");
  const t = document.getElementById("t");
  const n = document.getElementById("n");
  const m = document.getElementById("m");
  const hpv = document.getElementById("hpv");

  const tumoresComuns = {
    "cavidade-oral": [
      "Carcinoma de células escamosas",
      "Carcinoma verrucoso",
      "Carcinoma mucoepidermoide",
      "Carcinoma adenoide cístico",
      "Carcinoma indiferenciado",
    ],
    faringe: [
      "Carcinoma de células escamosas",
      "Linfoma",
      "Adenocarcinoma",
      "Carcinoma adenoide cístico",
      "Carcinoma mucoepidermoide",
    ],
    laringe: [
      "Carcinoma de células escamosas",
      "Carcinoma verrucoso",
      "Carcinoma adenoide cístico",
      "Carcinoma mucoepidermoide",
      "Carcinoma indiferenciado",
    ],
    pele: [
      "Carcinoma basocelular",
      "Carcinoma espinocelular",
      "Melanoma",
      "Linfoma cutâneo",
      "Carcinoma de células de Merkel",
    ],
    "glandulas-salivares": [
      "Carcinoma mucoepidermoide",
      "Carcinoma adenoide cístico",
      "Adenocarcinoma",
      "Carcinoma de células escamosas",
      "Carcinoma ex-pleomórfico",
    ],
  };

  const opcoesSublocalizacao = {
    "cavidade-oral": [
      "Selecione a sublocalização",
      "Lábio inferior",
      "Lábio superior",
      "Mucosa bucal",
      "Gengiva",
      "Palato duro",
      "Língua",
      "Assoalho bucal",
      "Glândulas salivares menores",
    ],
    faringe: [
      "Selecione a sublocalização",
      "Nasofaringe",
      "Orofaringe",
      "Hipofaringe",
    ],
    laringe: ["Selecione a sublocalização", "Supraglote", "Glote", "Subglote"],
    pele: ["Selecione a sublocalização", "Couro cabeludo", "Face", "Pescoço"],
    "glandulas-salivares": [
      "Selecione a sublocalização",
      "Parótida",
      "Submandibular",
      "Sublingual",
      "Menores",
    ],
  };
  //aqui termina as opções
  const prognosticoPorEstagio = {
    "cavidade-oral": {
      I: "A taxa de sobrevida em 5 anos para câncer de cavidade oral no estágio I é de aproximadamente 75%.",
      II: "A taxa de sobrevida em 5 anos para câncer de cavidade oral no estágio II é de aproximadamente 60%.",
      III: "A taxa de sobrevida em 5 anos para câncer de cavidade oral no estágio III é de aproximadamente 40%.",
      IVA: "A taxa de sobrevida em 5 anos para câncer de cavidade oral no estágio IVA varia de 20% a 40%.",
      IVB: "A taxa de sobrevida em 5 anos para câncer de cavidade oral no estágio IVB é de aproximadamente 10%.",
      IVC: "A taxa de sobrevida em 5 anos para câncer de cavidade oral no estágio IVC é de aproximadamente 5%.",
    },
    "glandulas-salivares": {
      I: "A taxa de sobrevida em 5 anos para câncer de glândulas salivares no estágio I é de aproximadamente 90%.",
      II: "A taxa de sobrevida em 5 anos para câncer de glândulas salivares no estágio II é de aproximadamente 75%.",
      III: "A taxa de sobrevida em 5 anos para câncer de glândulas salivares no estágio III é de aproximadamente 60%.",
      IVA: "A taxa de sobrevida em 5 anos para câncer de glândulas salivares no estágio IVA é de aproximadamente 50%.",
      IVB: "A taxa de sobrevida em 5 anos para câncer de glândulas salivares no estágio IVB é de aproximadamente 40%.",
      IVC: "A taxa de sobrevida em 5 anos para câncer de glândulas salivares no estágio IVC é de aproximadamente 25%.",
    },
    faringe: {
      I: "A taxa de sobrevida em 5 anos para câncer de faringe no estágio I é de aproximadamente 80%.",
      II: "A taxa de sobrevida em 5 anos para câncer de faringe no estágio II é de aproximadamente 70%.",
      III: "A taxa de sobrevida em 5 anos para câncer de faringe no estágio III é de aproximadamente 55%.",
      IVA: "A taxa de sobrevida em 5 anos para câncer de faringe no estágio IVA varia de 45% a 50%.",
      IVB: "A taxa de sobrevida em 5 anos para câncer de faringe no estágio IVB é de aproximadamente 30%.",
      IVC: "A taxa de sobrevida em 5 anos para câncer de faringe no estágio IVC é de aproximadamente 15%.",
    },
    laringe: {
      I: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio I é de aproximadamente 75%.",
      II: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio II é de aproximadamente 60%.",
      III: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio III é de aproximadamente 55%.",
      IVA: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio IVA varia de 35% a 45%.",
      IVB: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio IVB é de aproximadamente 25%.",
      IVC: "A taxa de sobrevida em 5 anos para câncer de laringe no estágio IVC é de aproximadamente 10%.",
    },
    pele: {
      I: "A taxa de sobrevida em 5 anos para câncer de pele no estágio I é de aproximadamente 95%.",
      II: "A taxa de sobrevida em 5 anos para câncer de pele no estágio II é de aproximadamente 90%.",
      III: "A taxa de sobrevida em 5 anos para câncer de pele no estágio III é de aproximadamente 65%.",
      IVA: "A taxa de sobrevida em 5 anos para câncer de pele no estágio IVA é de aproximadamente 45%.",
      IVB: "A taxa de sobrevida em 5 anos para câncer de pele no estágio IVB é de aproximadamente 35%.",
      IVC: "A taxa de sobrevida em 5 anos para câncer de pele no estágio IVC é de aproximadamente 15%.",
    },
  };

  function atualizarOpcoes() {
    const localizacao = document.getElementById("localizacao").value;
    const sublocalizacao = document.getElementById("sublocalizacao");
  
    // Limpa as opções atuais de "sublocalizacao"
    sublocalizacao.innerHTML = "";
    let opcoesSublocalizacao = [];
  
    if (localizacao === "laringe") {
      opcoesSublocalizacao = [
        { value: "", text: "Selecione a sublocalização" },
        { value: "glote", text: "Glote" },
        { value: "supraglote", text: "Supraglote" },
        { value: "subglote", text: "Subglote" },
      ];
    } else {
      // Adicione outras localizações e suas respectivas sublocalizações, caso necessário
    }
  
    opcoesSublocalizacao.forEach((opcao) => {
      const opt = document.createElement("option");
      opt.value = opcao.value;
      opt.text = opcao.text;
      sublocalizacao.add(opt);
    });
  
    // Chama a função atualizarOpcoesT() após atualizar as opções de sublocalização
    atualizarOpcoesT();
  }
  
  localizacao.addEventListener("change", atualizarOpcoes);
  atualizarOpcoes();

  function atualizarOpcoesT() {
    const sublocalizacao = document.getElementById("sublocalizacao").value;
    const t = document.getElementById("t");

    // Limpa as opções atuais de "t"
    t.innerHTML = "";

    // Glote
    if (sublocalizacao === "glote") {
      const opcoesT = [
        {
          value: "t1a",
          text: "T1a - Tumor limitado a uma corda vocal, com mobilidade normal",
        },
        {
          value: "t1b",
          text: "T1b - Tumor invade ambas as cordas vocais, com mobilidade normal",
        },
        {
          value: "t2",
          text: "T2 - Tumor invade a laringe extrínseca ou diminui a mobilidade da(s) corda(s) vocal(is)",
        },
        {
          value: "t3",
          text: "T3 - Tumor limitado à laringe com fixação da(s) corda(s) vocal(is)",
        },
        {
          value: "t4a",
          text: "T4a - Tumor invade a cartilagem tireoide, a laringe extrínseca, ou ambas",
        },
        {
          value: "t4b",
          text: "T4b - Tumor invade a coluna cervical através da cartilagem cricoide ou a cartilagem tireoide ou a parede posterior da faringe",
        },
      ];

      opcoesT.forEach((opcao) => {
        const opt = document.createElement("option");
        opt.value = opcao.value;
        opt.text = opcao.text;
        t.add(opt);
      });
    }
    // Supraglote
    else if (sublocalizacao === "supraglote") {
      const opcoesT = [
        {
          value: "t1",
          text: "T1 - Tumor limitado à supraglote unifocal com normalidade das cordas vocais",
        },
        {
          value: "t2",
          text: "T2 - Tumor invade a mucosa de mais de um subsítio supraglótico ou região glótica, ou uma área supraglótica menor ou igual a 1 cm em maior dimensão, sem fixação das cordas vocais",
        },
        {
          value: "t3",
          text: "T3 - Tumor limitado à laringe com fixação da(s) corda(s) vocal(is) ou tumor com extensão até a região pré-epiglótica ou paraglote, ou ambos, sem fixação das cordas vocais",
        },
        {
          value: "t4a",
          text: "T4a - Tumor invade a cartilagem tireoide ou extrínseca da laringe, ou ambos (por exemplo, através do ligamento tireoepiglótico, ou através da cartilagem tireoide, ou da laringe extrínseca) com ou sem fixação das cordas vocais",
        },
        {
          value: "t4b",
          text: "T4b - Tumor invade tecidos pré-vertebrais, cartilagem cricoide, ou a parede posterior da faringe",
        },
      ];

      opcoesT.forEach((opcao) => {
        const opt = document.createElement("option");
        opt.value = opcao.value;
        opt.text = opcao.text;
        t.add(opt);
      });
    } else if (sublocalizacao === "subglote") {
      const opcoesT = [
        { value: "t1", text: "T1 - Tumor limitado à subglote" },
        { value: "t2", text: "T2 - Tumor invade a laringe extrínseca" },
        {
          value: "t3",
          text: "T3 - Tumor limitado à laringe com fixação da(s) corda(s) vocal(is)",
        },
        {
          value: "t4a",
          text: "T4a - Tumor invade a cartilagem tireoide, a laringe extrínseca, ou ambas",
        },
        {
          value: "t4b",
          text: "T4b - Tumor invade a coluna cervical através da cartilagem cricoide ou a cartilagem tireoide ou a parede posterior da faringe",
        },
      ];

      opcoesT.forEach((opcao) => {
        const opt = document.createElement("option");
        opt.value = opcao.value;
        opt.text = opcao.text;
        t.add(opt);
      });
    }
  }
  document.getElementById("sublocalizacao").addEventListener("change", atualizarOpcoesT);

  function exibirTumoresComuns() {
    const localizacaoSelecionada = localizacao.value;
    const tumores = tumoresComuns[localizacaoSelecionada] || [];

    const listaTumores = document.getElementById("tipos-tumorais");
    listaTumores.innerHTML = "";

    if (tumores.length > 0) {
      const titulo = document.createElement("h3");
      titulo.textContent = "5 Tumores mais comuns nesta localização:";
      listaTumores.appendChild(titulo);

      const lista = document.createElement("ul");
      tumores.forEach((tumor) => {
        const item = document.createElement("li");
        item.textContent = tumor;
        lista.appendChild(item);
      });

      listaTumores.appendChild(lista);
    }
  }

  function exibirPrognosticoPorEstagio(estagio, localizacao) {
    const comentarioPrognostico = document.getElementById(
      "comentario-prognostico"
    );

    console.log("Estágio:", estagio);
    console.log("Localização:", localizacao);

    if (
      prognosticoPorEstagio.hasOwnProperty(localizacao) &&
      prognosticoPorEstagio[localizacao].hasOwnProperty(estagio)
    ) {
      comentarioPrognostico.textContent =
        prognosticoPorEstagio[localizacao][estagio];
    } else {
      comentarioPrognostico.textContent =
        "Prognóstico não disponível para a combinação selecionada de localização e estágio.";
    }
  }

  function calcularEstagioLaringe(t, n, m) {
    let estagio = "";

    // Lógica de estágio para Glote
    if (m === "m1") {
      estagio = "Estágio IVC";
    } else {
      switch (t) {
        case "t1":
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
          if (n === "n0" || n === "n1" || n === "n2") {
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

  function calcularEstagio() {
    const localizacao = document.getElementById("localizacao").value;
    const sublocalizacao = document.getElementById("sublocalizacao").value;
    const t = document.getElementById("t").value;
    const n = document.getElementById("n").value;
    const m = document.getElementById("m").value;
    const hpv = document.getElementById("hpv").value;

    let estagio = "";
    if (localizacao === "laringe") {
      estagio = calcularEstagioLaringe(t, n, m, hpv);
    } else {
      if (hpv === "positivo") {
        switch (t) {
          case "tx":
            estagio = "Não foi possível determinar o estágio.";
            break;
          case "t0":
            estagio = "Estágio 0";
            break;
          case "t1":
          case "t2":
            if (n === "n0" && m === "m0") {
              estagio = "Estágio I";
            } else if ((n === "n1" || n === "n2" || n === "n3") && m === "m0") {
              estagio = "Estágio II";
            } else if (m === "m1") {
              estagio = "Estágio IVA";
            }
            break;
          case "t3":
          case "t4a":
            if (n === "n0" && m === "m0") {
              estagio = "Estágio III";
            } else if ((n === "n1" || n === "n2" || n === "n3") && m === "m0") {
              estagio = "Estágio IVA";
            } else if (m === "m1") {
              estagio = "Estágio IVB";
            }
            break;
          case "t4b":
            if (m === "m0") {
              if (
                localizacao === "orofaringe" ||
                localizacao === "hipofaringe" ||
                localizacao === "laringe"
              ) {
                if (n === "n0") {
                  estagio = "Estágio IVA (HPV-)";
                } else if (n === "n1" || n === "n2a") {
                  estagio = "Estágio IVA (HPV+)";
                } else if (n === "n2b" || n === "n2c" || n === "n3") {
                  estagio = "Estágio IVB (HPV+)";
                }
              } else {
                estagio = "Estágio IVB (HPV-)";
              }
            } else if (m === "m1") {
              if (
                localizacao === "orofaringe" ||
                localizacao === "hipofaringe" ||
                localizacao === "laringe"
              ) {
                if (n === "n0") {
                  estagio = "Estágio IVB (HPV-)";
                } else if (n === "n1" || n === "n2a") {
                  estagio = "Estágio IVC (HPV+)";
                } else if (n === "n2b" || n === "n2c" || n === "n3") {
                  estagio = "Estágio IVC (HPV+)";
                }
              } else {
                estagio = "Estágio IVB (HPV-)";
              }
            }
            break;
          default:
            break;
        }
      } else if (hpv === "negativo") {
        if (t === "tx" || n === "nx" || m === "mx") {
          estagio = "Não foi possível determinar o estágio.";
        } else if (m === "m1") {
          estagio = "Estágio IVC";
        } else {
          switch (t) {
            case "t1":
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
              if (n === "n0" || n === "n1" || n === "n2") {
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
      }

      document.getElementById("estagio-tumor").innerHTML =
        "Estágio do tumor: " + estagio;
      let estagioFormatado = estagio.replace("Estágio ", "");
      exibirPrognosticoPorEstagio(estagioFormatado, localizacao);
      exibirTumoresComuns();

      return estagio; // Adicione esta linha
    }
  }
  document.getElementById("localizacao").addEventListener("change", function () {
    atualizarOpcoes();
    atualizarOpcoesT();
    calcularEstagioLaringe();
    calcularEstagio();
  });
  
  document.getElementById("sublocalizacao").addEventListener("change", function () {
    atualizarOpcoesT();
    calcularEstagioLaringe();
    calcularEstagio();
  });
  localizacao.addEventListener("change", function () {
    atualizarOpcoes();
    atualizarOpcoesT();
    calcularEstagioLaringe();
    calcularEstagio();
  });

  document
    .getElementById("calcular-estagio")
    .addEventListener("click", calcularEstagio);
});