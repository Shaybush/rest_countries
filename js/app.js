// filter countries 
let countries_List = [];
window.onload = () => {
    getCountry();
    declareEvents();
}

/** get the api of rest countries */
async function getCountry() {
    const url = await fetch('https://restcountries.com/v2/all')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // filter the data to countries: 1.have capital 2.population more than 0.1M
            countries_List = data.filter(country => country.capital && Math.floor(((country.population / 1000000) * 100) / 100) > 0);
            // create all the contries
            createCountries();
        })
        .catch(function () {
            console.log("cannot find your data")
        })
}

/**create all the contries from json file */
function createCountries() {
    if (countries_List) {
        countries_List.forEach((item) => {
            let box_country = new Country(item.name, item.population, item.flag, item.region, item.capital);
            // console.log(`name: ${item.name}  pop: ${item.population}  flags: ${item.flag}  region: ${item.region}`)
        })
    }
    localStorage.setItem("scoreList", JSON.stringify(scoresL));
}

/** Manage all the events */
function declareEvents() {
    let country_input = document.querySelector("#country_list");
    // just if country input exist
    if (country_input) {
        // listener until unput field
        country_input.addEventListener("input", () => {
            document.querySelector("#id_row").innerHTML = '';
            document.querySelector("#datalistOptions").innerHTML = '';
            countries_List.forEach((item) => {
                // check : 1. capital exist 2. population bigger than 0M 3. country name exist input value
                if (item.name.toLowerCase().includes(country_input.value.toLowerCase())) {
                    let box_country = new Country(item.name, item.population, item.flag, item.region, item.capital);
                    // box_country.render();
                }
            })
            // console.log(countries_List);
        })
    }
}

