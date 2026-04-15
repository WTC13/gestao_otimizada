const links = document.querySelectorAll('.link-tools');
const conteudo = document.getElementById('main-content');

window.search_page = function(name_page) {
    const conteudo = document.getElementById('main-content');
    const url = `/${name_page}`; 

    fetch(url)
        .then(resposta => {
            if (!resposta.ok) throw new Error('Página não encontrada');
            return resposta.text();
        })
        .then(conteudo_html => {
            conteudo.classList.remove("fade-in");
            void conteudo.offsetWidth;
            conteudo.innerHTML = conteudo_html;
            conteudo.classList.add("fade-in");

            // Manter suas lógicas específicas
            if (name_page.includes('price')) {
                ativarCalculadora();
            }
        })
        .catch(erro => console.error("Erro ao carregar a página!", erro));
}


document.querySelectorAll('.link-tools').forEach(click_link => {
    click_link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('data-page');
        window.search_page(page);
        
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

