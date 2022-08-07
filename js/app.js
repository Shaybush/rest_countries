// filter countries 
let countries_List = [],result;
window.onload = () => {
    result = 0;
    getCountry();
    declareEvents();
}

/** get the api of rest countries */
function getCountry() {
    const url = 'https://restcountries.com/v2/all';
    axios.get(url)
    .then(function(resp){
        // console.log(resp.data);
        countries_List = resp.data.filter(country => country.capital && Math.floor(((country.population / 1000000) * 100) / 100) > 0);
        filtersUpdate(countries_List.length);
        createCountries();
    });
}

/**create all the contries from json file */
function createCountries() {
    if (countries_List) {
        countries_List.forEach((item) => {
            let box_country = new Country("#id_row",item);
            // console.log(`name: ${item.name}  pop: ${item.population}  flags: ${item.flag}  region: ${item.region}`)
        })
    }
    // localStorage.setItem("scoreList", JSON.stringify(scoresL));
}
const filtersUpdate = (searchFound) =>{
    document.querySelector("#result_id").innerHTML = `found ${searchFound} countries`;
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
            result = 0;
            countries_List.forEach((item) => {
                if (item.name.toLowerCase().includes(country_input.value.toLowerCase())) {
                    result++;
                    let box_country = new Country("#id_row",item);
                }
            })
            filtersUpdate(result)
        })
    }
}

