// console.log('=================> connected')
const continentSelect = document.getElementById("select-continent");
const countryList = document.getElementById("country-in-continent");
// console.log('====================> ok', countryList)

// fetch all data from web app link 
const queryFetch = (query, variables) => {
  return fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(res => res.json())
}

// execute at start point 
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

// select continent and get countries from that continent 
const selectedData = (async e => {
  // console.log('========> Selected')
  var selectedContinent = document.getElementById('select-continent');
  var value = selectedContinent.options[selectedContinent.selectedIndex].value;
  console.log("The selected value=" + value);
  const countries = await getContinentCountries(value)  // call function to get country list
  console.log('coutries ===========> ',  countries) 
  countries.forEach(country => {
    const element = document.createElement('div')
    element.innerText = country.name
    // console.log('elements =======> ', element)
    countryList.append(element)
  })
})

// get countries from continent 
const getContinentCountries = (continentCode) => {
  console.log('================>', continentCode)
  return queryFetch(`
    query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
    }
  `, { code: continentCode }).then(data => {
    console.log('============> cnt', data)
    return data.data.continent.countries
  })
}