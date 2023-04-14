async function getBreaches() {
    const response = await fetch('https://haveibeenpwned.com/api/v2/breaches');
    const data = await response.json();
    return data;
  }

  async function populateTable() {
    const breaches = await getBreaches();
    const tbody = document.querySelector('#breach-table tbody');
    for (const breach of breaches) {
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
  }
  async function searchByDate() {
    const input = document.querySelector('#search-date').value;
    const breaches = await getBreaches();
    const tbody = document.querySelector('#breach-table-body');
    tbody.innerHTML = '';
    for (const breach of breaches) {
      const breachYear = breach.BreachDate.split('-')[0];
      if (breachYear === input) {
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
    }
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    populateTable();
    const searchInput = document.querySelector('#search-date');
    searchInput.addEventListener('input', searchByDate);
  });

 




/*const searchBtn = document.getElementById("search-btn");
const LoadBtn = document.getElementById("load-btn")
const resultsDiv = document.getElementById("results");

LoadBtn.addEventListener("click", async (event) => {
    console.log("clicked load data button")
  event.preventDefault();

 

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const results = await fetch("https://haveibeenpwned.com/api/v2/breaches", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    currentList = await results.json();
    console.table(currentList); 

})
*/