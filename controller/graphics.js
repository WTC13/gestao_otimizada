dash = document.getElementById('grapich_finance');

new Chart(dash, {
    type: 'bar',
    data: {
        labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [{
            label: 'Vendas por dia',
            data: [2, 5, 3, 8, 4, 1, 2],
            backgroundColor: '#94A3B8',
            borderColor: '#F0F4F8',
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtzero: true,
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
            loop: false
        }
    }
})


