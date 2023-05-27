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

    var estagio = calcularEstagio

    function calcularEstagio(idade, tiPo, t, n, m) {
        var estagio = "";
        var tiposT1T2T3 = ["t1", "t2", "t3"];
        var tiposN0Nx = ["n0", "nx"];
        var tiposN1aN1b = ["n1a", "n1b"];
    
        // Câncer de tireoide diferenciado
        if (tiPo === "papilifero" || tiPo === "folicular"){
            if (idade === "-55") {
                if (tiposT1T2T3.includes(t) && tiposN0Nx.includes(n) && m === "m0") {
                    estagio = "Estágio I";
                } else if (m === "m1") {
                    estagio = "Estágio II";
                }
            } else if (idade === "+55") {
                if (tiposT1T2T3.includes(t) && n === "n0" && m === "m0") {
                    estagio = "Estágio I";
                } else if (tiposT1T2T3.includes(t) && n === "n1" && m === "m0") {
                    estagio = "Estágio II";
                } else if (t === "t4" || n === "n1b" || m === "m1") {
                    estagio = "Estágio III";
                } else if (t === "t4" && tiposN1aN1b.includes(n) && m === "m1") {
                    estagio = "Estágio IV";
                }
            }
        }
    
        // Câncer de tireoide anaplásico (indiferenciado)
        else if (tiPo === "anaplasico") {
            if (m === "m1") {
                estagio = "Estágio IVC";
            } else if (tiposT1T2T3.includes(t) && tiposN0Nx.includes(n) && m === "m0") {
                estagio = "Estágio IV";
            } else if ((tiposT1T2T3.includes(t) && n === "n1" && m === "m0") || t === "t3b" || t === "t4") {
                estagio = "Estágio IVB";
            }
        }
    
        // Câncer de tireoide medular
        else if (tiPo === "medular") {
            if (t === "t1" && n === "n0" && m === "m0") {
                estagio = "Estágio I";
            } else if (tiposT1T2T3.includes(t) && n === "n0" && m === "m0") {
                estagio = "Estágio II";
            } else if (tiposT1T2T3.includes(t) && n === "n1a" && m === "m0") {
                estagio = "Estágio III";
            } else if (t === "t4a" || (tiposT1T2T3.includes(t) && n === "n1b" && m === "m0")) {
                estagio = "Estágio IVA";
            } else if (t === "t4b") {
                estagio = "Estágio IVC";
            }
    // exibir o resultado
     document.getElementById("resultado-estagio").textContent = estagio;
     console.log(estagio);
    // Gerar resumo
    gerarResumoEstadiamento();
        
    }

    // exibir o resultado
    document.getElementById("resultado-estagio").textContent = estagio;
    console.log(estagio);

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
    
        const resumo = `Idade: ${idadeCapitalizada}, Tipo de Câncer: ${tiPoCapitalizado}, T${tValue}, N${nValue}, M${mValue}`;
        document.getElementById('resumo-estadiamento').innerText = resumo;
        console.log(resumo);
    }
    

});