const links = document.querySelectorAll('.link-tools');
const conteudo = document.getElementById('main-content');

function search_page(name_page){

url = `./${name_page}.html`;

fetch(url)
    .then(resposta => resposta.text())
    .then(conteudo_html => {
        conteudo.classList.remove("fade-in");
        void conteudo.offsetWidth;
        conteudo.innerHTML = conteudo_html;
        conteudo.classList.add("fade-in");

        if (name_page === 'price') {
            ativarCalculadora();
        }
    })
    .catch(erro => console.error("Erro ao carregar a página, entre em contato com o suporte!", erro));
}

links.forEach(click_link => {
    click_link.addEventListener('click', function(event){
        event.preventDefault();
        const page = this.getAttribute('data-page');
        search_page(page);
        
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('card-active');
        });

        this.closest('.card').classList.add('card-active');
    })
})