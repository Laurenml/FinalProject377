

async function getBreaches() {
    const response = await fetch('https://haveibeenpwned.com/api/v2/breaches');
    const data = await response.json();
    return data;
  }

  async function populateTable() {
    const breaches = await getBreaches();
    const tbody = document.querySelector('#breach-table tbody');
    tbody.innerHTML = ''; // clear existing table rows
    const selectedBreaches = getRandomBreaches(breaches, 15); // select 15 random breaches
    for (const breach of selectedBreaches) {
      const row = tbody.insertRow();
      const nameCell = row.insertCell();
      const domainCell = row.insertCell();
      const dateCell = row.insertCell();
      const descriptionCell = row.insertCell();
      nameCell.textContent = breach.Name;
      domainCell.textContent = breach.Domain;
      dateCell.textContent = breach.BreachDate;
      descriptionCell.textContent = breach.Description;
    }
    localStorage.setItem('breaches', JSON.stringify(breaches));
  }
  
  function getRandomBreaches(breaches, count) {
    const shuffled = breaches.sort(() => 0.5 - Math.random()); // shuffle the breaches
    return shuffled.slice(0, count); // select the first `count` breaches
  }
  

  async function createChart() {

    // Count the number of breaches per year
    const counts = {};
    for (const breach of breaches) {
      const year = breach.BreachDate.split('-')[0];
      counts[year] = (counts[year] || 0) + 1;
    }
  
    // Extract the years and counts as separate arrays
    const years = Object.keys(counts);
    const countsData = years.map(year => counts[year]);
  
    // Create the bar chart
    const chartCanvas = document.querySelector('#breach-chart');
    const chart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: 'Number of Breaches',
          data: countsData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Incidents'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year of Incident'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
  
async function mainEvent(){
  const loadDataBtn = document.querySelector('#load-data-btn');
  const loadGraphBtn = document.querySelector('#load-graph-btn');
  } 

document.addEventListener('DOMContentLoaded', async () => mainEvent());

//const loadDataBtn = document.querySelector('#load-data-btn');
loadDataBtn.addEventListener('click', populateTable);
    console.log("clicked load data button");

document.addEventListener('DOMContentLoaded', () => {
    populateTable();  
    });

//const loadGraphBtn = document.querySelector('#load-graph-btn');
loadGraphBtn.addEventListener('click', function() {
    console.log("clicked load graph button")
    const breaches1 = JSON.parse(localStorage.getItem('breaches'));
    createChart(breaches1);
  });



