//var descartaUsuario = (function () {
//    var usuario = 'pikaxu';
//    });
//
//function buscaCartoesServidor(){
//    console.log('Carregando cartões');
//    $('#sync').addClass('botaoSync--esperando');
//    /**
//    ** Quando a origem do servidor é diferente deve-se utilizar no cabeçalho da 
//    **   página de destino uma permissão no cabeçalho, para que esta seja acessada de um lugar distinto
//    **/
//    $.getJSON('http://ceep.herokuapp.com/cartoes/carregar?callback=?',
//          { 
//            usuario: 'pikaxu'
//          },
//          function(dados){
//            console.dir(dados);
//            recebeCartoes (dados);
//          }
//        );
//}
//
//function consultaServidor(url, callback){
//    $.get(url, callback);
//}


// funções para salvar os cartões
function salvaCartoesServidor(){
    console.log('Sincroniza tudo com o servidor...');
    // deixa o botão em sincronização
    $('#sync').addClass('botaoSync--esperando');

    var cartoes = [];
    $('.cartao').each(function(){
        var cartao={};
        cartao.conteudo=$(this).find('.cartao-conteudo').html();
        cartao.cor=$(this).css('background-color');
        cartoes.push(cartao);
    });
    console.dir(cartoes);
    var dados={cartoes: cartoes, usuario: 'pikaxu'};
    $.ajax({
        url: 'http://ceep.herokuapp.com/cartoes/salvar',
        method: 'POST',
        data: dados,
        complete: function (){
            $('#sync').removeClass('botaoSync--esperando');
        },
        success: function(resposta){
            $('#sync').addClass('botaoSync--sincronizado');
            var numRemovidos = controladorDeCartoes.idUltimoCartao() - resposta.quantidade;
            console.log('Total cartões salvos: ' + resposta.quantidade + 
                        ' - cartões removidos: ' + numRemovidos );
            setTimeout(function(){
                $('#sync').removeClass('botaoSync--sincronizado');
            }, 1500);

        },
        error: function (){
            console.log('Falhou ao sincronizar com o servidor');
            $('#sync').addClass('botaoSync--deuRuim');
            setTimeout(function(){
                $('#sync').removeClass('botaoSync--deuRuim');
            }, 1500);
        }
    });
}