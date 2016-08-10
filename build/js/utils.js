function traduzMarkdowns(conteudo){
        return conteudo
                        /*1. traduz o negrito */
                                .replace(/\*([^\*]+)\*/gi, '<strong>$1</strong>')
                        /*2. traduz o itálico */
                                .replace(/\'\'([^\'\']+)\'\'/gi, '<em>$1</em>')
                        /*3. traduz o sublinhado */
                                .replace(/\-([^\-]+)\-/gi, '<u>$1</u>')
                        /*4. traduz as quebras de linha */
                                .replace(/\n/gi, '<br>');
        /**
        // texto de teste:
        *Texto negrito, com parte em ''itálico'' e uma 
        
        -parte sublinhada- e outra ''itálica e -sublinhada-''*
        **/
}

function identificaCriticidade(conteudo){
    var criticidade = 'padrao';
    var re = /cr[ií]tic|urgente|demorado|dif.cil/gi;
    if ((m = re.exec(conteudo)) !== null) {
        criticidade = 'critico';
    }else{            
        re = /simples|f[aá]cil|tranquil/;
        if ((m = re.exec(conteudo)) !== null) {
            criticidade = 'tranquilo';
        }
    }
    return criticidade;
}

function encontraMaiorPalavra(conteudo){
    var palavras = conteudo.replace(/[\n\.\,]/gi, ' ').trim().split(' ');
    var maiorPalavra = '';
    palavras.forEach(function(palavra){
        if(maiorPalavra.length < palavra.trim().length){
            maiorPalavra = palavra.trim();
        }
    });
    return maiorPalavra;
}

function calculaTamFonte(conteudo) {
    // calcula o tamanho da fonte
    var tamanhoFonte = 'textoPequeno';
    var quebrasDeLinha = conteudo.match(/\n/g);
    var numLinhasConteudo = 0;
    if(quebrasDeLinha === null){
        numLinhasConteudo = 0;
    }else{
        numLinhasConteudo = quebrasDeLinha.length;
    }
    var maiorPalavra = encontraMaiorPalavra(conteudo);

    if(conteudo.length < 55 && numLinhasConteudo < 5 && maiorPalavra.length < 9){
        tamanhoFonte = 'textoGrande';
    }else{
        if(conteudo.length < 75 && numLinhasConteudo < 6 && maiorPalavra.length < 12){
            tamanhoFonte = 'textoMedio';
        }
    }
    console.log('Núm quebras de linha: '+ numLinhasConteudo);
    console.log('Núm letras: '+conteudo.length);
    console.log('Maior palavra: '+maiorPalavra+' - tamanho: '+maiorPalavra.length);
    console.log('Tamanho da fonte: '+tamanhoFonte);
    return tamanhoFonte;
}

function traduzReferencias(conteudo){
    var valoresReferencia = {
        '@didi': 'Adriano Pamplona',
        '@adriano': 'Adriano Pamplona',
        '@rodrigo': 'Rodrigo Santos Menezes',
        '@zeniel': 'Zeniel Chaves'
    };
    conteudoTraduzido = conteudo;
    $.each(valoresReferencia, function(indice, valor){
        conteudoTraduzido = conteudoTraduzido.split(indice).join(valor);
    });
    console.log('Texto traduzido: '+conteudoTraduzido);
    return conteudoTraduzido;
}