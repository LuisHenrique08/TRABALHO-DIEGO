let carrinho = [];
let total = 0;

function adicionarItem(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('carrinho');
    const totalSpan = document.getElementById('total');
    lista.innerHTML = "";
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$${item.preco}`;
        const btnRemover = document.createElement('button');
        btnRemover.textContent = "Remover";
        btnRemover.onclick = () => removerItem(index);
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
    totalSpan.textContent = total;
}

// Remover item do carrinho
function removerItem(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Atualizar resumo da forma de pagamento
document.getElementById('forma-pagamento').addEventListener('change', function() {
    const forma = this.value;
    document.getElementById('resumo-pagamento').textContent = this.options[this.selectedIndex].text;

    if (forma === "pix") {
        gerarQRCode();
        document.getElementById('pix-container').style.display = "block";
        document.getElementById('cartao-msg').style.display = "none";
    } else if (forma === "cartao") {
        document.getElementById('pix-container').style.display = "none";
        document.getElementById('cartao-msg').style.display = "block";
    } else {
        document.getElementById('pix-container').style.display = "none";
        document.getElementById('cartao-msg').style.display = "none";
    }
});

// Gerar um QR Code aleatório para Pix
function gerarQRCode() {
    const valor = total.toFixed(2);
    const chavePix = `00020126330014BR.GOV.BCB.PIX0114+558199999999952040000530398654051.00${valor}5802BR5920Restaurante Teste6009SAO PAULO62190515Pedido${Math.floor(Math.random() * 10000)}`;
    
    // Criar URL do QR Code com a API do Google Charts
    const urlQRCode = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(chavePix)}`;

    // Definir o src da imagem para exibir o QR Code corretamente
    const imgQRCode = document.getElementById('qrcode');
    imgQRCode.src = urlQRCode;
    imgQRCode.style.display = "block"; // Garante que a imagem aparece
}

// Simular finalização do pedido
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    const formaPagamento = document.getElementById('forma-pagamento').value;
    let mensagem = `Pedido finalizado com sucesso!\nTotal: R$${total}\nForma de Pagamento: ${formaPagamento.toUpperCase()}`;

    if (formaPagamento === "cartao") {
        mensagem += "\nO pagamento será realizado na entrega.";
    } else if (formaPagamento === "pix") {
        mensagem += "\nPor favor, escaneie o QR Code para pagar.";
    }

    alert(mensagem);
    carrinho = [];
    total = 0;
    atualizarCarrinho();
}

