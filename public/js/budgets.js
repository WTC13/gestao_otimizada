// Usamos o 'click' no documento porque o formulário entra e sai da tela
document.addEventListener('click', async (e) => {
    
    // Verifica se o que foi clicado é o botão de salvar do formulário
    if (e.target && e.target.innerText === 'Salvar Orçamento') {
        const form = document.getElementById('formOrcamento');
        if (!form) return;

        // Impedimos o envio padrão do formulário
        e.preventDefault();
        
        console.log("Botão detectado dinamicamente. Iniciando envio...");

        const session = JSON.parse(localStorage.getItem('user_session'));
        if (!session) {
            alert("Sessão não encontrada. Faça login novamente.");
            return;
        }

        const dados = {
            enterprise_id: session.enterprise_id,
            user_id: session.id,
            client_id: parseInt(document.getElementById('selectCliente').value),
            valid_until: document.getElementById('validade').value,
            total_value: parseFloat(document.getElementById('valorTotal').innerText.replace(',', '.')) || 0,
            itens: itensOrcamento.map(item => ({
                id: item.id_produto,
                qtd: item.quantidade,
                preco: item.valor_unitario
            }))
        };

        try {
            console.log("Dados sendo enviados:", dados);
            const response = await fetch('http://127.0.0.1:5000/api/budgets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                alert("Orçamento salvo com sucesso!");
                form.reset();
            } else {
                const errorData = await response.json();
                alert("Erro: " + (errorData.error || "Erro desconhecido"));
            }
        } catch (error) {
            console.error("Erro na conexão:", error);
            alert("Servidor Python offline.");
        }
    }
});

// Array para guardar os itens antes de enviar para o banco
let itensOrcamento = [];

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'addBtn') {
        const itemSelect = document.getElementById('itemSelect');
        const itemQtd = document.getElementById('itemQtd');
        const itemPreco = document.getElementById('itemPreco');

        if (!itemSelect.value || !itemPreco.value) {
            alert("Preencha o item e o preço!");
            return;
        }

        const subtotal = parseFloat(itemQtd.value) * parseFloat(itemPreco.value);

        // Adiciona ao array
        const novoItem = {
            descricao: itemSelect.options[itemSelect.selectedIndex].text,
            quantidade: parseInt(itemQtd.value),
            valor_unitario: parseFloat(itemPreco.value),
            subtotal: subtotal
        };

        itensOrcamento.push(novoItem);
        atualizarTabela();
    }
});

function atualizarTabela() {
    const corpoTabela = document.getElementById('tabelaItens');
    const valorTotalSpan = document.getElementById('valorTotal');
    let totalGeral = 0;

    corpoTabela.innerHTML = ""; // Limpa a tabela

    itensOrcamento.forEach((item, index) => {
        totalGeral += item.subtotal;
        corpoTabela.innerHTML += `
            <tr>
                <td>${item.descricao}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.valor_unitario.toFixed(2)}</td>
                <td>R$ ${item.subtotal.toFixed(2)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });

    valorTotalSpan.innerText = totalGeral.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}

// Função global para o botão excluir funcionar
window.removerItem = (index) => {
    itensOrcamento.splice(index, 1);
    atualizarTabela();
};