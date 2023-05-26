const dadosPrognostico = {
    "Estágio I": {
      comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Localizado' na classificação SEER.",
      taxaSobrevida: "Sobrevida relativa em 5 anos é de aproximadamente 94%",
    },
    "Estágio II": {
      comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Localizado' na classificação SEER.",
      taxaSobrevida: "Sobrevida relativa em 5 anos é de aproximadamente 94%",
    },
    "Estágio III": {
      comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Regional' na classificação SEER.",
      taxaSobrevida: "Sobrevida relativa em 5 anos é de aproximadamente 70%",
    },
    "Estágio IV": {
      comentario: "Comentário sobre o prognóstico: \nCorresponde, aproximadamente, ao estágio 'Distante' na classificação SEER.",
      taxaSobrevida: "Sobrevida relativa em 5 anos é de aproximadamente 43%",
    },
  };
  
  const prognosticoPorEstagio = {
      parotida: dadosPrognostico,
      submandibular: dadosPrognostico,
      sublingual: dadosPrognostico,
      glandulasMenores: dadosPrognostico,
  };
  

document.addEventListener('DOMContentLoaded', function () {
    
    const calcularEstagioButton = document.getElementById('calcular-estagio-glandulas-salivares');

    // Verificar se o botão existe antes de adicionar um ouvinte de evento
    if(calcularEstagioButton) {
        calcularEstagioButton.addEventListener('click', function () {
            const tValue = document.getElementById('t').value;
            const nValue = document.getElementById('n').value;
            const mValue = document.getElementById('m').value;
           
            const estagioTumor = calcularEstagioGlandulasSalivares(tValue, nValue, mValue);
            exibirEstagioTumor(estagioTumor);

            const comentarioPrognostico = obterComentarioPrognostico(estagioTumor);
            exibirComentarioPrognostico(comentarioPrognostico);

            gerarResumoOpcoes();
            exibirTaxaSobrevida(estagioTumor);
            exibirFonte();
        });
    } else {
        console.error("Botão 'calcular-estagio-glandulas-salivares' não encontrado.");
    }

    document.getElementById('copy-btn').addEventListener('click', function() {
        var ids = ['estagio-tumor', 'resumo-opcoes', 'comentario-prognostico', 'taxa-sobrevida', 'tumores-comuns'];
        var textoParaCopiar = '';
        ids.forEach(function(id) {
            var elemento = document.getElementById(id);
            if (elemento) {
                textoParaCopiar += (elemento.innerText + '\n\n');
            } else {
                console.error('Não foi possível encontrar o elemento com o id: ' + id);
            }
        });
    
        navigator.clipboard.writeText(textoParaCopiar)
            .then(function() {
                console.log('Texto copiado com sucesso!');
            })
            .catch(function(err) {
                console.error('Erro ao copiar texto: ', err);
            });
    });
    
    function calcularEstagioGlandulasSalivares() {
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
    
    function exibirEstagioTumor() {
        const estagioTumor = calcularEstagioGlandulasSalivares();
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
        document.getElementById('fonte').textContent = "Fonte: Surveillance, Epidemiology, and End Results (SEER) Program (www.seer.cancer.gov) \nFonte2: TNM Maligant Tumors Classifications - 8th edition - UICC";
    }
    

});