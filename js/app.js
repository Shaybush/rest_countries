// filter countries 
let countries_List = [],result;
window.onload = () => {
    result = 0;
    getCountry();
    declareEvents();
}

/** get the api of rest countries */
const  getCountry = async() => {
    const url = 'https://restcountries.com/v2/all';
    let resp = await fetch(url);
    let data = await resp.json();
        // console.log(resp.data);
        countries_List = data.filter(country => country.capital && Math.floor(((country.population / 1000000) * 100) / 100) > 0);
        filtersUpdate(countries_List.length);
        createCountries();

}

/**create all the contries from json file */
const createCountries = (input="",selectedV = "name") => {
    if (countries_List) {
        console.log(countries_List);
        console.log(`selected value : ${selectedV}`);
        document.querySelector("#id_row").innerHTML = '';
        document.querySelector("#datalistOptions").innerHTML = '';
        result = 0;
        document.querySelector("#id_row").innerHTML = "";
        // population we want biggest to low
        countries_List = selectedV!= "population"? _.sortBy(countries_List , selectedV) : _.reverse(_.sortBy(countries_List , selectedV))
        countries_List.forEach((item , index) => {
            if (item.name.toLowerCase().includes(input.toLowerCase())){
                result++;
                let box_country = new Country("#id_row",item , index);
        }
            // console.log(`name: ${item.name}  pop: ${item.population}  flags: ${item.flag}  region: ${item.region}`)
        })
    }
}
const filtersUpdate = (searchFound) =>{
    document.querySelector("#result_id").innerHTML = `found ${searchFound} countries`;
}
/** Manage all the events */
const declareEvents = () => {
    let country_input = document.querySelector("#country_list");
    let selected_input = document.querySelector("#filter_id");
    // just if country input exist
    if (country_input && selected_input) {
        // listener until input field
        country_input.addEventListener("input", () => {
            createCountries(country_input.value,selected_input.value)
            filtersUpdate(result)
        })
        selected_input.addEventListener("input",()=>{
            createCountries(country_input.value,selected_input.value)
        })
    }

}

