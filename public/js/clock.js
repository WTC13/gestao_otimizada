function clock() {
    const agora = new Date();

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const optionsDate = {
        weekday: 'long',
        day: '2-digit',
        month: 'long'
    };

    let horaFormatada = agora.toLocaleTimeString('pt-BR', optionsTime);
    let dataFormatada = agora.toLocaleDateString('pt-BR', optionsDate);

    // Capitaliza a primeira letra da data (ex: terça-feira -> Terça-feira)
    dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    $('#clock-time').text(horaFormatada);
    $('#clock-date').text(dataFormatada);
}

setInterval(clock, 1000);

$(document).ready(function() {
    clock();
});