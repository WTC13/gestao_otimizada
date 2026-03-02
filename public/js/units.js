function navegarParaItens(categoriaId) {
    console.log("Acessando itens da categoria:", categoriaId);
    
    // Armazena para saber o que filtrar na próxima tela
    localStorage.setItem('categoria_atual', categoriaId);

    // Chama a função correta que definimos no navigation.js
    if (typeof window.search_page === 'function') {
        window.search_page('unit_items');
    } else {
        console.error("Função search_page não encontrada!");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver(() => {
        const titulo = document.getElementById('tituloCategoria');
        const categoria = localStorage.getItem('categoria_atual');
        
        if (titulo && categoria) {
            titulo.innerText = `Itens da Categoria: ${categoria.toUpperCase()}`;
        }
    });

    // Observa o main-content para saber quando o conteúdo mudou
    const main = document.getElementById('main-content');
    if (main) observer.observe(main, { childList: true });
});