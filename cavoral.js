const prognosticoPorEstagio = {
    labios: {
      "Estágio I": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Local' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 94%",
      },
      "Estágio II": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 66%",
      },
      "Estágio III": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 66%",
      },
      "Estágio IV": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Distante' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 32%",
      },
    },
    lingua: {
      "Estágio I": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Local' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 82%",
      },
      "Estágio II": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 68%",
      },
      "Estágio III": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 68%",
      },
      "Estágio IV": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Distante' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 40%",
      },
    },
    assoalho_Boca: {
      "Estágio I": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Local' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 76%",
      },
      "Estágio II": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 38%",
      },
      "Estágio III": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Regional' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 38%",
      },
        "Estágio IV": {
        comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Distante' na classificação SEER.",
        taxaSobrevida: "Sobrevida em 5 anos aproximada é de 20%",
      },
    },
    outros: {
        "Nota": {
            comentario: "Comentário sobre o prognóstico: \nPara cânceres de gengiva e outras partes da boca, a taxa de sobrevida relativa é de 60%. No entanto, a taxa de sobrevida por estágio específico não está disponível. Essas informações são baseadas na sobrevida relativa, que compara a sobrevida de pessoas com a mesma idade e sexo que não têm o câncer.",
            taxaSobrevida: "Sobrevida relativa é de aproximadamente 60%"
        }
    },
    };

    
document.addEventListener('DOMContentLoaded', function () {
    
    const calcularEstagioButton = document.getElementById('calcular-estagio-cavoral');
  
    calcularEstagioButton.addEventListener('click', function () {
      const tValue = document.getElementById('t').value;
      const nValue = document.getElementById('n').value;
      const mValue = document.getElementById('m').value;
       
      
      const estagioTumor = calcularEstagioCavoral(tValue, nValue, mValue);
      exibirEstagioTumor(estagioTumor);
  
      const comentarioPrognostico = obterComentarioPrognostico(estagioTumor);
      exibirComentarioPrognostico(comentarioPrognostico);
      // Certifique-se de que a função gerarResumoOpcoes é chamada aqui
      gerarResumoOpcoes();
      exibirTaxaSobrevida(estagioTumor);
      exibirFonte();
            
    });

    /**
     * This function calculates the stage of oral cavity cancer based on the selected values for T, N,
     * and M.
     * @returns the value of the variable "estagio", which represents the stage of the tumor based on
     * the selected values for T, N, and M.
     */
    function calcularEstagioCavoral() {
        const tSelect = document.getElementById('t');
        const nSelect = document.getElementById('n');
        const mSelect = document.getElementById('m');
    
        // Lidando com variações de N2 e N3
        let tValue = tSelect.value;
        let nValue = nSelect.value.startsWith('n2') ? 'n2' : nSelect.value.startsWith('n3') ? 'n3' : nSelect.value;
        const mValue = mSelect.value;
    
        // Criar a combinação selecionada
        const combinacaoEscolhida = `${tValue}${nValue}${mValue}`;
    
        // Verificar qual estágio tem a combinação escolhida
        if (mValue === 'm1') {
            return 'Estágio IVc';
        } else if (['t4bn0m0', 't4bn1m0', 't4bn2m0', 't4bn3m0'].includes(combinacaoEscolhida) || nValue === 'n3') {
            return 'Estágio IVb';
        } else if (['t4an0m0', 't4an1m0', 't4an2m0', 't1n2m0', 't2n2m0', 't3n2m0'].includes(combinacaoEscolhida)) {
            return 'Estágio IVa';
        } else if (combinacaoEscolhida === 't3n0m0') {
            return 'Estágio III';
        } else if (['t1n1m0', 't2n1m0'].includes(combinacaoEscolhida)) {
            return 'Estágio III';
        } else if (combinacaoEscolhida === 't2n0m0') {
            return 'Estágio II';
        } else if (combinacaoEscolhida === 't1n0m0') {
            return 'Estágio I';
        } else if (combinacaoEscolhida === 'tisn0m0') {
            return 'Estágio 0';
        } else {
            return 'Não Classificado';
        }
    }
    
          
    
    /**
     * This function displays the stage of a tumor based on a calculated value.
     */
    function exibirEstagioTumor() {
        const estagioTumor = calcularEstagioCavoral();
        document.getElementById('estagio-tumor').textContent = 'Estágio do Tumor: ' + estagioTumor;
        console.log(estagioTumor);
    }

    function gerarResumoOpcoes() {
        const t = document.getElementById('t').value;
        const n = document.getElementById('n').value;
        const m = document.getElementById('m').value;
        const sublocalizacao = document.getElementById('sublocalizacao').value;
    
        const tValue = t.substr(1);
        const nValue = n.substr(1);
        const mValue = m.substr(1);
        
        console.log(`tValue: ${tValue}, nValue: ${nValue}, mValue: ${mValue}`);
    
        const sublocalizacaoCapitalizada = sublocalizacao.charAt(0).toUpperCase() + sublocalizacao.slice(1);
    
        const resumo = ` T${tValue} N${nValue} M${mValue} de ${sublocalizacaoCapitalizada}`;
        document.getElementById('resumo-opcoes').innerText = resumo;
    }

    function obterComentarioPrognostico(estagioTumor) {
        let sublocalizacao = document.getElementById('sublocalizacao').value;
    
        // Se a sublocalização não for 'labios', 'lingua' ou 'assoalho_Boca', atribua 'outros'
        if (!["labios", "lingua", "assoalho_Boca"].includes(sublocalizacao)) {
            sublocalizacao = "outros";
            estagioTumor = "Nota"; // Use 'Nota' como estágio para 'outros'
        }
    
        if (["Estágio IVa", "Estágio IVb", "Estágio IVc"].includes(estagioTumor)) {
            estagioTumor = "Estágio IV";
        }
    
        // Verificar se a sublocalizacao existe no objeto prognosticoPorEstagio
        if (prognosticoPorEstagio.hasOwnProperty(sublocalizacao)) {
            // Verificar se o estagioTumor existe na sublocalizacao
            if (prognosticoPorEstagio[sublocalizacao].hasOwnProperty(estagioTumor)) {
                return prognosticoPorEstagio[sublocalizacao][estagioTumor].comentario;
            }
        }
    
        // Retornar um valor padrão caso nenhuma condição anterior seja satisfeita
        return "Comentário não disponível para este estágio de tumor.";
    }
    
    
    function exibirComentarioPrognostico(comentario) {
        document.getElementById('comentario-prognostico').textContent = comentario;
        console.log(comentario);
    }

    function exibirTaxaSobrevida(estagioTumor) {
        let sublocalizacao = document.getElementById('sublocalizacao').value;
    
        // Se a sublocalização não for 'labios', 'lingua' ou 'assoalho_boca', atribua 'outros'
        if (!["labios", "lingua", "assoalho_boca"].includes(sublocalizacao)) {
            sublocalizacao = "outros";
            estagioTumor = "Nota"; // Use 'Nota' como estágio para 'outros'
        }
    
        if (["Estágio IVa", "Estágio IVb", "Estágio IVc"].includes(estagioTumor)) {
            estagioTumor = "Estágio IV";
        }
    
        // Verificar se a sublocalizacao existe no objeto prognosticoPorEstagio
        if (prognosticoPorEstagio.hasOwnProperty(sublocalizacao)) {
            // Verificar se o estagioTumor existe na sublocalizacao
            if (prognosticoPorEstagio[sublocalizacao].hasOwnProperty(estagioTumor)) {
                let taxaSobrevida = prognosticoPorEstagio[sublocalizacao][estagioTumor].taxaSobrevida;
                document.getElementById('taxa-sobrevida').textContent = taxaSobrevida;
                console.log(taxaSobrevida);
            }
        }
    }
    
    
    function exibirFonte() {
        document.getElementById('fonte').textContent = "Fonte: Surveillance, Epidemiology, and End Results (SEER) Program (www.seer.cancer.gov) \n Fonte2: TNM Maligant Tumors Classifications - 8th edition - UICC";
    }

});