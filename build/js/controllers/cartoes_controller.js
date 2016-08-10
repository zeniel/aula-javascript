//function removeCartao(event) {
////    this.parentNode.parentNode.remove();
////    debugger;
//    var idCartao = event.target.dataset.cartao;
//    console.log('Removendo cartao: ' + idCartao);
//    var cartao = document.querySelector('#' + idCartao);
//    cartao.classList.add('cartao--some');
//    setTimeout(function () {
//        cartao.remove();
//        $(document).trigger('sincronizarCartoes');
//    }, 500);
//}

/***************/
//function criaCartao(conteudoCartao, cor){
//    if (conteudoCartao) {
//        // conta o número de cartões existentes
//        var numCartoes = document.querySelectorAll(".cartao").length;
//        // cria o botão para remover
//        var botaoRemove = $('<button>')
//                            .attr('data-cartao', 'cartao_'+numCartoes)
//                            .addClass('opcoesDoCartao-opcao')
//                            .addClass('opcoesDoCartao-remove')
//                            .attr('title', 'Remover')
//                            .text('Remover')
//                            .click(removeCartao);
//        // cria a div de opções
//        var opcoes = $("<div>")
//                            .addClass('opcoesDoCartao')
//                            .append(botaoRemove);
//        
//        // calcula o tamanho da fonte
//        var tamanhoFonte = calculaTamFonte(conteudoCartao);
//        // identifica a criticidade do conteúdo
//        var estiloCartao = identificaCriticidade(conteudoCartao);
//        // traduz os markdowns do texto 
//        var conteudoCartaoHTML = traduzMarkdowns(conteudoCartao);
//        // traduz referências
//        conteudoCartaoHTML = traduzReferencias(conteudoCartaoHTML);
//        
//        var timer;
//        var conteudoTag = $('<p>')
//                            .addClass('cartao-conteudo')
//                            .attr('contenteditable', true)
//                            .on('input', function(){
//                                clearTimeout(timer);
//                                timer = setTimeout(function(){
//                                    $(document).trigger('sincronizarCartoes');
//                                }, 3000);
//                             })
//                            .append(conteudoCartaoHTML);
//        
//        // cria o cartão com o conteúdo
//        var idNovoCartao = 'cartao_'+numCartoes;
//        $('<div>').addClass('cartao cartao--some')
//                  .addClass('cartao--'+estiloCartao)
//                  .addClass('cartao--'+tamanhoFonte)
//                  .attr('id', idNovoCartao)
//                  .append(opcoes)
//                  .append(conteudoTag)
//                  .prependTo('.mural');
//        
////        debugger;
//        if(typeof cor == 'string'){
//            $('#' + idNovoCartao).css('background-color', cor);
//        }
//        
//        setTimeout(function(){
//            $('#' + idNovoCartao).removeClass('cartao--some');
//        }, 500);
//    }
//}


/******************/

function filtraCartoes () {
    var digitado = $(this).val().trim();
    $('.cartao')
            .hide()
            .filter(function(){
                var regex = new RegExp(digitado, 'i');
                var conteudo = $(this).find('.cartao-conteudo').text();
                return regex.test(conteudo);
            })
            .show();
}

/*******************/
function recebeCartoes (dados){
        console.log('Agora vai....');
        console.dir(dados);
    
        for (i=dados.cartoes.length-1; i>=0; i--){
            cartao = dados.cartoes[i];
            console.log('Conteúdo: ' + cartao.conteudo+' - Cor: '+cartao.cor);
            console.dir(controladorDeCartoes);
            controladorDeCartoes.adicionaCartao(cartao.conteudo, cartao.cor);
        }

        $('#sync').removeClass('botaoSync--esperando');
        $('#sync').addClass('botaoSync--sincronizado');
        setTimeout(function(){
            $('#sync').removeClass('botaoSync--sincronizado');
        }, 5000);
}

// busca cartões do servidor
function buscaCartoesServidor(){
    console.log('Carregando cartões');
    $('#sync').addClass('botaoSync--esperando');
    /**
    ** Quando a origem do servidor é diferente deve-se utilizar no cabeçalho da 
    **   página de destino uma permissão no cabeçalho, para que esta seja acessada de um lugar distinto
    **/
    $.getJSON('http://ceep.herokuapp.com/cartoes/carregar?callback=?',
          { 
            usuario: 'pikaxu'
          },
          function(dados){
            console.dir(dados);
            recebeCartoes (dados);
          }
        );
}

function consultaServidor(url, callback){
    $.get(url, callback);
}

function trataNovoTextoRecebido(dados){
        console.log('Chegou a ajuda....');
        console.dir(dados);
        $.each(dados.instrucoes, function(){
            console.log('Conteúdo: ' + this.conteudo+' - Cor: '+this.cor);
            controladorDeCartoes.adicionaCartao(this.conteudo, this.cor);
        });
        $(document).trigger('sincronizarCartoes');
}

function trataNovoTextoAleatorio(dados){
        console.log('Elemento aleatório....');
        var textosPossiveis = ['crítico','urgente','demorado','difícil', 'simples','fácil', 'tranquilo', ''];
        var elementoAleatorio = textosPossiveis[Math.floor(Math.random()*textosPossiveis.length)];
        var item = dados[Math.floor(Math.random()*dados.length)];
        console.log('ID: ' + item.id+ 'Titulo: ' + item.title+' - Corpo: '+item.body);
        controladorDeCartoes.adicionaCartao(item.title+' '+elementoAleatorio);
        $(document).trigger('sincronizarCartoes');
}

// Funções da ajuda
function buscaAjudaServidor(){
    console.log('clicaram na ajuda');
    consultaServidor('http://ceep.herokuapp.com/cartoes/instrucoes', trataNovoTextoRecebido);
}

// obtem conteúdo aleatório
function buscaConteudoAleatorio(){
    consultaServidor('https://jsonplaceholder.typicode.com/posts', trataNovoTextoAleatorio);
}