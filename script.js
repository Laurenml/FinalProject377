

async function getBreaches() {
    const response = await fetch('https://haveibeenpwned.com/api/v2/breaches');
    const data = await response.json();
    return data;
  }


async function populateTable() {
  const breaches = await getBreaches();
  const tbody = document.querySelector('#breach-table tbody');
  const searchInput = document.querySelector('#search-input');
  const searchValue = searchInput.value;
  tbody.innerHTML = ''; // clear the existing table rows

  let selectedBreaches;
  if (searchValue.trim() === '') {
    selectedBreaches = getRandomBreaches(breaches, 5); // get 5 random breaches from entire data set
  } else {
    const filteredBreaches = breaches.filter(breach => breach.BreachDate.includes(searchValue));
    selectedBreaches = getRandomBreaches(filteredBreaches, 25); // select 5 random breaches from filtered data
  }

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
    const shuffled = breaches.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, count); // select the first `count` breaches
  }
  

  function createChart(breaches) {

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
    const chartCanvas = document.getElementById("breach-chart");
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
  populateTable()
  const loadDataBtn = document.querySelector('#load-data-btn');
  const loadGraphBtn = document.querySelector('#load-graph-btn');
  const searchInput = document.querySelector('#search-input');
  


loadDataBtn.addEventListener('click', function(x){
    console.log("clicked load data button");
    x.preventDefault();
    populateTable()
});

loadGraphBtn.addEventListener('click', function(x) {
    console.log("clicked load graph button")
    x.preventDefault();
    const breaches1 = JSON.parse(localStorage.getItem('breaches'));
    createChart(breaches1);
  });

  searchInput.addEventListener('input', function() {
    populateTable();
  });

}
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent());
