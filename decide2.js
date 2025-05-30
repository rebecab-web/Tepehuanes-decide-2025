// CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
	<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBSDYntJBcdaT5AWakFIP5cYk7GZ0jxeaI",
    authDomain: "tepehuanes-decide-2025-35bc0.firebaseapp.com",
    projectId: "tepehuanes-decide-2025-35bc0",
    storageBucket: "tepehuanes-decide-2025-35bc0.firebasestorage.app",
    messagingSenderId: "29160858739",
    appId: "1:29160858739:web:8ae70f4a40a066f2cdf606"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const ctx = document.getElementById('resultadosChart').getContext('2d');
let resultadosChart;

function renderChart(data) {
  const labels = ["PRIAN (Olivia Mendoza)", "Morena (Ramón Abdala)", "Movimiento Ciudadano", "Votos Nulos"];
  const valores = [
    data.prian || 0,
    data.morena || 0,
    data.mc || 0,
    data.nulos || 0
  ];

  if (resultadosChart) {
    resultadosChart.data.datasets[0].data = valores;
    resultadosChart.update();
  } else {
    resultadosChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Votos',
          data: valores,
          backgroundColor: ['#005BAC', '#800000', '#FF6F00', '#888888']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Resultados en Tiempo Real' }
        }
      }
    });
  }
}

// Escuchar cambios en Firebase
database.ref('/resultados').on('value', snapshot => {
  const data = snapshot.val() || {};
  renderChart(data);
});