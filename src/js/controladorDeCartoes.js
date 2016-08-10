var controladorDeCartoes = (function () {
    function removeCartao(event) {
        var idCartao = event.target.dataset.cartao;
        console.log('Removendo cartao: ' + idCartao);
        var cartao = document.querySelector('#' + idCartao);
        cartao.classList.add('cartao--some');
        setTimeout(function () {
            cartao.remove();
            numCartoes--;
            $(document).trigger('sincronizarCartoes');
        }, 500);
    }
    
    var ultimoIDCartao = 0;
    var numCartoes = 0;
    function adicionaCartao(conteudoCartao, cor){
        if (conteudoCartao) {
            console.log('Adicionando novo cartão....');
            ultimoIDCartao++;
            numCartoes++;
            // conta o número de cartões existentes
//            var numCartoes = document.querySelectorAll(".cartao").length;
            // cria o botão para remover
            var botaoRemove = $('<button>')
                                .attr('data-cartao', 'cartao_'+ultimoIDCartao)
                                .addClass('opcoesDoCartao-opcao')
                                .addClass('opcoesDoCartao-remove')
                                .attr('title', 'Remover')
                                .text('Remover')
                                .click(removeCartao);
            // cria a div de opções
            var opcoes = $("<div>")
                                .addClass('opcoesDoCartao')
                                .append(botaoRemove);

            // calcula o tamanho da fonte
            var tamanhoFonte = calculaTamFonte(conteudoCartao);
            // identifica a criticidade do conteúdo
            var estiloCartao = identificaCriticidade(conteudoCartao);
            // traduz os markdowns do texto 
            var conteudoCartaoHTML = traduzMarkdowns(conteudoCartao);

            // traduz referências
            conteudoCartaoHTML = traduzReferencias(conteudoCartaoHTML);

            var timer;
            var conteudoTag = $('<p>')
                                .addClass('cartao-conteudo')
                                .attr('contenteditable', true)
                                .on('input', function(){
                                    clearTimeout(timer);
                                    timer = setTimeout(function(){
                                        $(document).trigger('sincronizarCartoes');
                                    }, 3000);
                                 })
                                .append(conteudoCartaoHTML);

            // cria o cartão com o conteúdo
            var idNovoCartao = 'cartao_'+ultimoIDCartao;
            $('<div>').addClass('cartao cartao--some')
                      .addClass('cartao--'+estiloCartao)
                      .addClass('cartao--'+tamanhoFonte)
                      .attr('id', idNovoCartao)
                      .append(opcoes)
                      .append(conteudoTag)
                      .prependTo('.mural');

    //        debugger;
            if(typeof cor == 'string'){
                $('#' + idNovoCartao).css('background-color', cor);
            }

            setTimeout(function(){
                $('#' + idNovoCartao).removeClass('cartao--some');
            }, 500);
        }
    }
    
    return {
        adicionaCartao: adicionaCartao,
        idUltimoCartao: function () {
            return ultimoIDCartao;
        }
    };

})();