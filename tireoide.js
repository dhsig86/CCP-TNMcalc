const sobrevidaPorEstagio = {
    "papilifero": {
        "Estágio I": { taxa: "quase 100%", comentario: "O prognóstico é excelente. O tratamento geralmente envolve uma tireoidectomia seguida de terapia com iodo radioativo, se necessário." },
        "Estágio II": { taxa: "quase 100%", comentario: "O prognóstico continua sendo muito bom. Os tratamentos envolvem a remoção da glândula tireoide, seguida de terapia com iodo radioativo e monitoramento regular." },
        "Estágio III": { taxa: "93%", comentario: "O prognóstico ainda é bom, mas a doença pode ser mais difícil de tratar. Pode ser necessário um tratamento mais intensivo, incluindo uma combinação de cirurgia, terapia com iodo radioativo e terapia hormonal." },
        "Estágio IV": { taxa: "51%", comentario: "O prognóstico é menos favorável no Estágio IV. Neste estágio, o câncer pode ter se espalhado para outros órgãos. O tratamento pode incluir cirurgia, radioterapia e quimioterapia." }
    },
    "folicular": {
        "Estágio I": { taxa: "quase 100%", comentario: "O prognóstico é excelente. A maioria dos pacientes responde bem à cirurgia e à terapia subsequente com iodo radioativo." },
        "Estágio II": { taxa: "quase 100%", comentario: "O prognóstico é muito bom. A cirurgia é o tratamento mais comum, seguido de terapia com iodo radioativo." },
        "Estágio III": { taxa: "93%", comentario: "O prognóstico é bom, embora o tratamento possa ser mais complexo, envolvendo uma combinação de cirurgia, terapia com iodo radioativo e terapia hormonal." },
        "Estágio IV": { taxa: "51%", comentario: "O prognóstico é menos favorável no Estágio IV. O tratamento pode envolver uma combinação de cirurgia, terapia com iodo radioativo, terapia hormonal e, em alguns casos, quimioterapia." }
    },
    "medular": {
        "Estágio IVA": { taxa: "56%", comentario: "O prognóstico é menos favorável na fase IVA. O tratamento geralmente inclui cirurgia, terapias direcionadas e, às vezes, radioterapia." },
        "Estágio IVB": { taxa: "39%", comentario: "Nesta fase, o câncer pode ter se espalhado para os tecidos próximos ou para os linfonodos distantes. O tratamento é complexo e pode incluir cirurgia, terapias direcionadas, radioterapia e, ocasionalmente, quimioterapia." },
        "Estágio IVC": { taxa: "8%", comentario: "O prognóstico é difícil nesta fase. O câncer provavelmente se espalhou para outros órgãos. O tratamento pode envolver terapias direcionadas, radioterapia e quimioterapia." }
    },
    "anaplasico": {
        "Estágio IV": { taxa: "14%", comentario: "O prognóstico para o câncer anaplásico da tireoide é geralmente pobre, pois este tipo de câncer é agressivo e resistente ao tratamento. O tratamento pode incluir uma combinação de cirurgia, radioterapia e quimioterapia." }
    }

};
/**
 * The function calculates the stage of thyroid cancer based on various factors such as age, tumor
 * size, lymph node involvement, and metastasis.
 * @param idade - age (string)
 * @param tiPo - The type of thyroid cancer (papillary, follicular, anaplastic, or medullary).
 * @param t - t represents the size and extent of the primary tumor in the thyroid gland. It is one of
 * the factors used to determine the stage of thyroid cancer.
 * @param n - The parameter "n" is likely referring to the presence or absence of regional lymph node
 * metastasis in the context of thyroid cancer staging.
 * @param m - The presence or absence of distant metastasis (spread of cancer to other parts of the
 * body) in a patient with thyroid cancer. It is one of the factors used to determine the stage of the
 * cancer.
 * @returns a string representing the stage of thyroid cancer based on the input parameters. The
 * possible values for the returned string are "Estágio I", "Estágio II", "Estágio III", "Estágio IVA",
 * "Estágio IVB", "Estágio IVC", or "Estágio IV".
 */
function calcularEstagio(idade, tiPo, t, n, m) {
    var estagio = "";

    // Câncer de tireoide diferenciado (papilifero ou folicular)
    if (tiPo === "papilifero" || tiPo === "folicular") {
        if (idade === "menorque55") {
            if (m === "m0") {
                estagio = "Estágio I";
            } else if (m === "m1") {
                estagio = "Estágio II";
            }
        } else if (idade === "maiorque55") {
            if ((["t1", "t1a", "t1b", "t2"].includes(t) && n === "n0" && m === "m0") ||
                (["t3", "t3a", "t3b"].includes(t) && n === "n0" && m === "m0")) {
                estagio = "Estágio I";
            } else if ((["t1", "t1a", "t1b", "t2","t3", "t3a", "t3b"].includes(t) && ["n1", "n1a", "n1b"].includes(n) && m === "m0")) {
                estagio = "Estágio II";
            } else if (["t4a", "t4b"].includes(t) && ["n0", "n1", "n1a", "n1b"].includes(n) && m === "m0") {
                estagio = "Estágio III";
            } else if (m === "m1") {
                estagio = "Estágio IV";
            }
        }
    }
   
    // Câncer de tireoide anaplásico (indiferenciado)
    else if (tiPo === "anaplasico") {
        estagio = "Estágio IV";  // Todos os cânceres anaplásicos da tireoide são estágio IV
    }

    // Câncer de tireoide medular
    else if (tiPo === "medular") {
        if (t.startsWith("t1") && n === "n0" && m === "m0") {
            estagio = "Estágio I";
        } else if (t === "t2" && n === "n0" && m === "m0") {
            estagio = "Estágio II";
        } else if (["t1", "t1a","t1b", "t2"].includes(t) && n === "n1" && m === "m0") {
            estagio = "Estágio III";
        } else if ((t.startsWith("t3") && ["n0", "n1"].includes(n) && m === "m0") ||
                   (["t1", "t1a","t1b", "t2", "t3","t3a","t3b"].includes(t) && n === "n0" && m === "m1")) {
            estagio = "Estágio IVA";
        } else if ((t === "t4" && n === "n0" && m === "m0") ||
                   (["t1","t1a","t1b", "t2", "t3"].includes(t) && n === "n1" && m === "m1") ||
                   (t.startsWith("t3") && ["n1", "n1a","n1b"].includes(n) && m === "m1")) {
            estagio = "Estágio IVB";
        } else if (t.startsWith("t4") && ["n0", "n1", "n1a","n1b"].includes(n) && m === "m1") {
            estagio = "Estágio IVC";
        }
    }

    return estagio;
}


function exibirEstagio(estagio) {
    document.getElementById("resultado-estagio").textContent = 'Estágio do Tumor: ' + estagio;
    console.log(estagio);
}


function gerarResumoEstadiamento() {
    const idade = document.getElementById('idade').value;
    const tiPo = document.getElementById('tiPo').value;
    const t = document.getElementById('t').value;
    const n = document.getElementById('n').value;
    const m = document.getElementById('m').value;

    const tValue = t.substr(1);
    const nValue = n.substr(1);
    const mValue = m.substr(1);

    console.log(`Idade: ${idade}, Tipo de Câncer: ${tiPo}, T: ${tValue}, N: ${nValue}, M: ${mValue}`);

    const idadeCapitalizada = idade.charAt(0).toUpperCase() + idade.slice(1);
    const tiPoCapitalizado = tiPo.charAt(0).toUpperCase() + tiPo.slice(1);

    const resumo = `T${tValue}, N${nValue}, M${mValue},Tumor ${tiPoCapitalizado}, Idade: ${idadeCapitalizada}, `;
    document.getElementById('resumo-opcoes').innerText = resumo;
    console.log(resumo);
}

function exibirSobrevida(tiPo, estagio) {
    // transformar os estágios IVA, IVB e IVC em Estágio IV
    if (estagio === "Estágio IVA" || estagio === "Estágio IVB" || estagio === "Estágio IVC") {
        estagio = "Estágio IV";
    }
    
    var taxa = sobrevidaPorEstagio[tiPo][estagio].taxa;
    var comentario = sobrevidaPorEstagio[tiPo][estagio].comentario;
    var taxabold = taxa.bold();
    
    // Exibe a taxa de sobrevida e o comentário no elemento com o id "comentario-prognostico"
    document.getElementById("comentario-prognostico").innerHTML = "Taxa de sobrevida em 5 anos: " + taxabold + ". " + comentario;
}



document.getElementById("calcular-estagio-tireoide").addEventListener("click", function() {
    var idade = document.getElementById("idade").value;
    var tiPo = document.getElementById("tiPo").value;
    var t = document.getElementById("t").value;
    var n = document.getElementById("n").value;
    var m = document.getElementById("m").value;

    console.log("idade: " + idade);
    console.log("tiPo: " + tiPo);
    console.log("t: " + t);
    console.log("n: " + n);
    console.log("m: " + m);
    console.log("idade antes de calcularEstagio: " + idade);
    console.log("t antes de calcularEstagio: " + t);
    console.log("n antes de calcularEstagio: " + n);
    console.log("m antes de calcularEstagio: " + m);

    var estagio = calcularEstagio(idade, tiPo, t, n, m);
    exibirEstagio(estagio);
    // Gerar resumo
    gerarResumoEstadiamento();
    // Exibir sobrevida
    exibirSobrevida(tiPo, estagio);
});

// Fim do evento click
