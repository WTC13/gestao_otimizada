function ativarCalculadora() {
    const custoInput = document.getElementById('custoItem');
    const impostoInput = document.getElementById('imposto');
    const margemInput = document.getElementById('margem');
    
    function calcular() {
        const custo = parseFloat(custoInput.value) || 0;
        const impostoPerc = parseFloat(impostoInput.value) || 0;
        const margemPerc = parseFloat(margemInput.value) || 0;

        document.getElementById('margemValor').innerText = margemPerc;

        const valorImposto = custo * (impostoPerc / 100);
        const precoComImposto = custo + valorImposto;
        const valorLucro = precoComImposto * (margemPerc / 100);
        const precoFinal = precoComImposto + valorLucro;

        // Atualiza a tela
        document.getElementById('precoFinal').innerText = precoFinal.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        document.getElementById('lucroReal').innerText = valorLucro.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        document.getElementById('totalImposto').innerText = valorImposto.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    custoInput.addEventListener('input', calcular);
    impostoInput.addEventListener('input', calcular);
    margemInput.addEventListener('input', calcular);
}