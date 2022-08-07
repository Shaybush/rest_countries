// filter countries 
let countries_List = [];
window.onload = () => {
    getCountry();
    declareEvents();
}

/** get the api of rest countries */
function getCountry() {
    
    const url = 'https://restcountries.com/v2/all';
    axios.get(url)
    .then(function(resp){
        // console.log(resp.data);
        countries_List = resp.data;
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
                    let box_country = new Country("#id_row",item);
                    // box_country.render();
                }
            })
            // console.log(countries_List);
        })
    }
}

