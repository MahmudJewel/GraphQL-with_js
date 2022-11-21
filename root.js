// console.log('=================> connected')
const continentSelect = document.getElementById("select-continent");
// console.log('====================> ok', continentSelect)

// fetch all data from web app link 
function queryFetch(query, variables) {
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    }).then(res => res.json())
}

queryFetch(`
  query {
    continents {
      name
      code
    }
  }
`).then(data => {
    data.data.continents.forEach(continent => {
        const option = document.createElement('option')
        option.value = continent.code
        option.innerText = continent.name
        continentSelect.append(option)
        //   console.log(option)
    })
    // console.log(data.data)
})

const selectedData = () => {
    // console.log('========> Selected')
    var selectedContinent = document.getElementById('select-continent');
    var value = selectedContinent.options[selectedContinent.selectedIndex].text;
    console.log("The selected value=" + value);
} 

