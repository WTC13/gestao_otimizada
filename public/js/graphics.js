const dash = document.getElementById('grapich_finance');

new Chart(dash, {
    type: 'bar',
    data: {
        labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        datasets: [{
            label: 'Vendas por dia',
            data: [2, 5, 3, 8, 4, 1, 2],
            // Azul Ciano com transparência
            backgroundColor: 'rgba(13, 202, 240, 0.7)',
            // Azul Ciano sólido na borda
            borderColor: '#0dcaf0',
            borderWidth: 2,
            borderRadius: 8, // Barras arredondadas (estilo moderno)
            borderSkipped: false,
            hoverBackgroundColor: '#0dcaf0'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Remove legenda para um visual mais limpo
            },
            tooltip: {
                backgroundColor: '#0f172a',
                titleFont: { size: 14, weight: 'bold' },
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                border: { display: false },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)', // Linhas horizontais bem sutis
                    drawTicks: false
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font: { size: 11 }
                }
            },
            x: {
                border: { display: false },
                grid: {
                    display: false // Remove linhas verticais
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font: { size: 11 }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        }
    }
});