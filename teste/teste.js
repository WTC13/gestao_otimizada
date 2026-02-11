// Simulando dados que viriam de outras páginas ou API
const contents = {
    home: "<h1>Página Inicial</h1><p>Visão geral do sistema.</p>",
    orcamento: "<h1>Orçamentos</h1><p>Aqui você gerencia seus custos e propostas.</p>",
    clientes: "<h1>Clientes</h1><p>Lista de contatos e parceiros comerciais.</p>",
    config: "<h1>Configurações</h1><p>Ajuste as preferências do seu perfil.</p>"
};

const menuItems = document.querySelectorAll('.menu-item');
const contentDisplay = document.getElementById('main-content');

menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Remove 'active' de todos e adiciona no clicado
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // 2. Transição suave de conteúdo
        const key = this.getAttribute('data-content');
        
        // Remove a animação para reiniciar
        contentDisplay.classList.remove('fade-in');
        
        // Força um "reflow" para o browser notar que tiramos a classe
        void contentDisplay.offsetWidth; 

        // 3. Atualiza o conteúdo e reaplica a animação
        contentDisplay.innerHTML = contents[key];
        contentDisplay.classList.add('fade-in');
    });
});