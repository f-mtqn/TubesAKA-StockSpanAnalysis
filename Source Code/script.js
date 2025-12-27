// IMPLEMENTASI ALGORITMA

//1. Algoritma Rekursif (Naive)
function calculateSpanRecursive(price, current_day, check_day) {
    if (check_day < 0 || price[check_day] > price[current_day]) {
        return 0;
    } else {
        return 1 + calculateSpanRecursive(price, current_day, check_day - 1);
    }
}

function runRecursiveWrapper(price) {
    const n = price.length;
    const span = new Array(n).fill(0); 
    for (let i = 0; i < n; i++) {
        span[i] = 1 + calculateSpanRecursive(price, i, i - 1);
    }
    return span;
}

//2. Algoritma Iteratif (Stack)
function runStackWrapper(price) {
    const n = price.length;
    const span = new Array(n);
    const st = [];
    
    st.push(0);
    span[0] = 1;

    for (let i = 1; i < n; i++) {
        while (st.length > 0 && price[st[st.length - 1]] <= price[i]) {
            st.pop();
        }

        if (st.length === 0) {
            span[i] = i + 1;
        } else {
            span[i] = i - st[st.length - 1];
        }
        st.push(i);
    }
    return span;
}

//FUNGSI PEMBANTU (GENERATOR DATA (HARGA))
function generateData(n, type) {
    const data = [];
    if (type === 'ascending') {
        for (let i = 0; i < n; i++) data.push(i * 10);
    } else {
        for (let i = 0; i < n; i++) data.push(Math.floor(Math.random() * 100));
    }
    return data;
}

//LOGIKA PENGUJIAN UTAMA
let comparisonChart = null;

async function runExperiment() {
    const inputSizes = [10, 100, 1000, 2000, 3000, 5000, 10000]; 
    const dataType = document.getElementById('dataType').value;
    
    const timesRecursive = [];
    const timesStack = [];
    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';

    console.log("Memulai eksperimen...");

    for (let n of inputSizes) {
        const prices = generateData(n, dataType);
        let t1 = null; // Rekursif
        let t2 = null; // Stack

        try {
            const startRec = performance.now();
            runRecursiveWrapper(prices);
            const endRec = performance.now();
            t1 = endRec - startRec;
        } catch (e) {
            console.warn(`Rekursif gagal pada N=${n}: ${e.message}`);
            t1 = null;
        }

        const startStack = performance.now();
        runStackWrapper(prices);
        const endStack = performance.now();
        t2 = endStack - startStack;

        timesRecursive.push(t1); 
        timesStack.push(t2);

        let t1Display;
        if (t1 === null) {
            t1Display = "<span style='color:red; font-weight:bold;'>Stack Overflow (Error)</span>";
        } else {
            t1Display = `${t1.toFixed(4)} ms`;
        }

        const row = `<tr>
            <td>${n}</td>
            <td>${t1Display}</td>
            <td>${t2.toFixed(4)} ms</td>
        </tr>`;
        tbody.innerHTML += row;

        await new Promise(r => setTimeout(r, 10));
    }

    updateChart(inputSizes, timesRecursive, timesStack);
}


// VISUALISASI GRAFIK (CHART.JS)
function updateChart(labels, dataRec, dataStack) {
    const ctx = document.getElementById('timeChart').getContext('2d');
    
    if (comparisonChart) {
        comparisonChart.destroy();
    }

    comparisonChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Rekursif (Naive) - O(N^2)',
                    data: dataRec,
                    borderColor: 'red',
                    backgroundColor: 'rgba(94, 38, 50, 0.2)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true
                },
                {
                    label: 'Iteratif (Stack) - O(N)',
                    data: dataStack,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: { display: true, text: 'Waktu Eksekusi (ms)' },
                    beginAtZero: true
                },
                x: {
                    title: { display: true, text: 'Jumlah Data (N)' }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Grafik Perbandingan Running Time'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.raw === null) return "Stack Overflow (Error)";
                            return context.formattedValue + " ms";
                        }
                    }
                }
            }
        }
    });
}
