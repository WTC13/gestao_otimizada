document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Exibe um alerta de "Carregando" (opcional, mas profissional)
    Swal.fire({
        title: 'Autenticando...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Salva os dados do usuário no navegador
            localStorage.setItem('user_session', JSON.stringify(data.user));

            // Alerta de Sucesso
            Swal.fire({
                title: 'Bem-vindo!',
                text: 'Login realizado com sucesso.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Redireciona para a tela principal
                window.location.href = './views/main.html';
            });

        } else {
            // Alerta de Erro vindo do Python (Senha incorreta, Empresa inativa, etc)
            Swal.fire({
                title: 'Falha no Login',
                text: data.error || 'Verifique suas credenciais.',
                icon: 'error',
                confirmButtonColor: '#0d6efd'
            });
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
        
        // Alerta de Erro de Conexão (Servidor Offline)
        Swal.fire({
            title: 'Erro de Conexão',
            text: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
            icon: 'warning',
            confirmButtonColor: '#f8bb86'
        });
    }
});