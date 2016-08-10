var botaoMudaLayout = document.querySelector('#mudalayout');
var mural = document.querySelector('.mural');
var botoesRemove = document.querySelectorAll('.opcoesDoCartao-remove');
var formularioInclusao = document.querySelector('#formNovoCartao');


botaoMudaLayout.addEventListener('click', function (event) {
    alternaTextoBotao(event);
});
botaoMudaLayout.addEventListener('click', function (event) {
    alternaMural(event);
});

// evento botão remove cartão
for (var i = 0; i < botoesRemove.length; i++) {
    var botao = botoesRemove[i];
    botao.addEventListener('click', function(event) {
            removeCartao(event);
    } );
}

// evento inclusão de novo cartão
formularioInclusao.addEventListener('submit', function(event){
    event.preventDefault(); /* bloqueia a operação padrão do evento */
    campoTexto = $(event.target).find('textarea');
    conteudoCartao = campoTexto.val().trim();
    console.log('Conteúdo cartão: '+conteudoCartao);
    campoTexto.val('');
    controladorDeCartoes.adicionaCartao(conteudoCartao);
    $(document).trigger('sincronizarCartoes');
    event.target.querySelector('textarea').focus();
});

// botão evento de busca
$('#busca')
    .on('paste', filtraCartoes)
    .on('input', filtraCartoes);

// interceptar teclas pressionadas
$(window)
    /* trata evento de ctrl + f =>> foco na pesquisa de cartões */
    .keydown(function(e){
        if ((e.ctrlKey || e.metaKey || e.keyCode === 17) && e.keyCode === 70) {
            e.preventDefault();
            $('#busca').focus();
        }
    })
    /* trata evento ctrl + i =>> foco na inserção de novo cartão */
    .keydown(function(e){
        if ((e.ctrlKey || e.metaKey || e.keyCode === 17) && (e.keyCode === 73 || e.keyCode === 78 )) {
            e.preventDefault();
            $('#textNovoCartao').focus();
        }
    })
    /* trata evento ctrl + r =>> busca um cartão aleatório */
    .keydown(function(e){
        if ((e.ctrlKey || e.metaKey || e.keyCode === 17) && (e.keyCode === 82)) {
            e.preventDefault();
            buscaConteudoAleatorio();
        }
    });

// botão ajuda
$('#ajuda').one('click', buscaAjudaServidor);

// botão aleatório
$('#aleatorio').on('click', buscaConteudoAleatorio);

// botão sincronizar cartões
$('#sync').on('click', function(){ $(document).trigger('sincronizarCartoes');});

// evento sincronizar cartões
$(document).on('sincronizarCartoes', function() { salvaCartoesServidor(); });

// evento carregando a pãgina
$(window).on('load', buscaCartoesServidor);