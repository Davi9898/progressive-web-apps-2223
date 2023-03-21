function zoekText() {
    let zoekWaarde = document.querySelector('header input').value
    if (zoekWaarde.length > 2 && zoekWaarde != '') {
      // Make an AJAX request to fetch the search results
      fetch('/search?query=' + zoekWaarde)
        .then(response => response.json())
        .then(data => {
          // Get a reference to the search results container
          const resultsContainer = document.querySelector('#search-results');
  
          // Clear any existing search results
          resultsContainer.innerHTML = '';
  
          // Loop through the search results and create a new element for each one
          data.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.textContent = result.title;
            resultsContainer.appendChild(resultElement);
          });
        });
    } else if (zoekWaarde.length < 2) {
      // Make an AJAX request to fetch default search results
      fetch('/search?query=Rembrandt')
        .then(response => response.json())
        .then(data => {
          // Get a reference to the search results container
          const resultsContainer = document.querySelector('#search-results');
  
          // Clear any existing search results
          resultsContainer.innerHTML = '';
  
          // Loop through the search results and create a new element for each one
          data.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.textContent = result.title;
            resultsContainer.appendChild(resultElement);
          });
        });
    }
  }