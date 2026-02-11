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

function ativarCalculadora() {
    const custoInput = document.getElementById('custoItem');
    const impostoInput = document.getElementById('imposto');
    const margemInput = document.getElementById('margem');
    
    function calcular() {
        const custo = parseFloat(custoInput.value) || 0;
        const impostoPerc = parseFloat(impostoInput.value) || 0;
        const margemPerc = parseFloat(margemInput.value) || 0;

        document.getElementById('margemValor').innerText = margemPerc;

        // Fórmulas simples:
        const valorImposto = custo * (impostoPerc / 100);
        const precoComImposto = custo + valorImposto;
        const valorLucro = precoComImposto * (margemPerc / 100);
        const precoFinal = precoComImposto + valorLucro;

        // Atualiza a tela
        document.getElementById('precoFinal').innerText = precoFinal.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        document.getElementById('lucroReal').innerText = valorLucro.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        document.getElementById('totalImposto').innerText = valorImposto.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    // Ouve as mudanças nos inputs
    custoInput.addEventListener('input', calcular);
    impostoInput.addEventListener('input', calcular);
    margemInput.addEventListener('input', calcular);
}