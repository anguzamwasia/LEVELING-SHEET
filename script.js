// Define table header data
const headers = ["Back Sight", "Intermediate Sight", "Foresight", "Rise (m)", "Fall (m)", "Reduced Level (m)", "Distance (m)", "Height of Collinelimation (m)", "Remarks"];

// Function to create and populate the table with empty rows
function createTable() {
  const table = document.getElementById('leveling-table');
  
  // Create table header row
  const headerRow = document.createElement('tr');
  for (const header of headers) {
    const headerCell = document.createElement('th');
    headerCell.textContent = header;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);
  
  // Create initial data row
  createDataRow();
}

// Function to create a new data row
function createDataRow() {
  const table = document.getElementById('leveling-table');
  const dataRow = document.createElement('tr');
  
  for (const header of headers) {
    const dataCell = document.createElement('td');
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.required = true; // Make input mandatory
    dataCell.appendChild(inputField);
    dataRow.appendChild(dataCell);
  }
  table.appendChild(dataRow);
}

// Function to download table data as CSV
function downloadCSV() {
  const table = document.getElementById('leveling-table');
  
  // Create CSV data string
  let csvData = "";
  csvData += headers.join(',') + '\n'; // Add header row
  
  const rows = table.querySelectorAll('tr');
  for (let i = 1; i < rows.length; i++) { // Skip header row
    const row = rows[i];
    const cells = row.querySelectorAll('td');
    let rowData = "";
    for (let j = 0; j < cells.length; j++) {
      const cellValue = cells[j].querySelector('input').value;
      rowData += cellValue + ',';
    }
    csvData += rowData.slice(0, -1) + '\n'; // Remove trailing comma
  }
  
  // Create a Blob object with the CSV data
  const csvBlob = new Blob([csvData], { type: 'text/csv' });
  
  // Create a downloadable link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(csvBlob);
  link.download = 'leveling_data.csv';
  link.click();
}

// Create the initial table
createTable();

// Add event listener to add row button
const addRowBtn = document.getElementById('add-row-btn');
addRowBtn.addEventListener('click', createDataRow);

// Add event listener to download button
const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', downloadCSV);
