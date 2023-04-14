

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
const loadDataBtn = document.querySelector('#load-data-btn');
loadDataBtn.addEventListener('click', function() {
  populateTable(function() {
    loadDataBtn.style.display = 'none';
  });
});

  document.addEventListener('DOMContentLoaded', () => {
    populateTable();
    const searchInput = document.querySelector('#search-date');
    searchInput.addEventListener('input', searchByDate);
  });
  
