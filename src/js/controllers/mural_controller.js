var botaoMudaLayout = document.querySelector('#mudalayout');
var mural = document.querySelector('.mural');

function alternaMural(event) {
    mural.classList.toggle('mural--linhas');
}

function alternaTextoBotao(event) {
    if (!mural.classList.contains('mural--linhas')) {
        event.target.innerHTML = 'Colunas';
    } else {
        event.target.innerHTML = 'Linhas';
    }
}