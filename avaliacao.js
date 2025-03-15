// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('avaliacaoForm');
    const listaAvaliacoes = document.getElementById('listaAvaliacoes');
    const estrelas = document.querySelectorAll('.estrelas span');
    const inputNota = document.getElementById('nota');

    let notaSelecionada = 0;

    // Selecionar nota
    estrelas.forEach(estrela => {
        estrela.addEventListener('click', () => {
            notaSelecionada = estrela.getAttribute('data-value');
            inputNota.value = notaSelecionada;

            estrelas.forEach(e => e.classList.remove('ativa'));
            estrela.classList.add('ativa');
        });
    });

    // Enviar avaliação
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const comentario = document.getElementById('comentario').value;

        if (!nome || !notaSelecionada) {
            alert('Por favor, preencha seu nome e selecione uma nota.');
            return;
        }

        const avaliacao = {
            nome,
            nota: notaSelecionada,
            comentario,
            data: new Date().toLocaleDateString()
        };

        salvarAvaliacao(avaliacao);
        form.reset();
        notaSelecionada = 0;
        estrelas.forEach(e => e.classList.remove('ativa'));
        mostrarAvaliacoes();
    });

    // Salvar no LocalStorage
    function salvarAvaliacao(avaliacao) {
        let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
        avaliacoes.push(avaliacao);
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    }

    // Mostrar avaliações
    function mostrarAvaliacoes() {
        listaAvaliacoes.innerHTML = '';
        const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

        avaliacoes.forEach(avaliacao => {
            const div = document.createElement('div');
            div.className = 'avaliacao';
            div.innerHTML = `
                <h3>${avaliacao.nome} - ${'★'.repeat(avaliacao.nota)}${'☆'.repeat(5 - avaliacao.nota)}</h3>
                <p>${avaliacao.comentario || 'Sem comentário'}</p>
                <small>${avaliacao.data}</small>
            `;
            listaAvaliacoes.appendChild(div);
        });
    }

    // Carregar avaliações ao abrir a página
    mostrarAvaliacoes();
});