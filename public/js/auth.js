document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user_session', JSON.stringify(data.user));
            window.location.href = './views/main.html';
        } else {
            errorDiv.classList.remove('d-none');
            errorDiv.innerText = data.error || 'Erro ao realizar login.';
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
        errorDiv.classList.remove('d-none');
        errorDiv.innerText = 'Servidor fora do ar.';
    }
});