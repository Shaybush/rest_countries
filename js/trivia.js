let lives, level,points;
// all the players scores
let scoresL = [];
// no reapeat answers
let prevQuestion = [];
// get countries from the api request
let countries_List = [];
const init = () => {
    points = 0;
    lives = 5;
    level = 1;
    checkLocal();
    getCountry();
    updateUi();
}
const getCountry = async() => {
    let url = "https://restcountries.com/v2/all"
    let resp = await fetch(url);
    let data = await resp.json();
    countries_List = data.filter(country => country.capital && Math.floor(((country.population / 1000000) * 100) / 100) > 0 && country.name != 'Palestine, State of');
    prevQuestion = [...countries_List];
    build_trivia();

}

const checkLocal = () => {
    if (localStorage["scoreListCapital"]) {
        scoresL = JSON.parse(localStorage["scoreListCapital"]);
    }
}

const build_trivia = () => {
    // filter countries if: capital == true && population bigger than 0M
    // const countries = countries_List;
    let rnd_ar = [];
    let counter = 0;
    let rnd = Math.floor(Math.random() * prevQuestion.length);
    let correct_ans = prevQuestion[rnd].capital;
    let question = prevQuestion[rnd];
    let answers = [prevQuestion[rnd].capital];
    rnd_ar.push(rnd);
    // disable repeat
    while(counter < 3 ){
        rnd = Math.floor(Math.random() * prevQuestion.length);
        // כאשר הוא לא נמצא במערך של ההגרלות
        if(rnd_ar.indexOf(rnd) == -1){
            rnd_ar.push(rnd);
            answers.push(prevQuestion[rnd].capital);
            counter++;
        }
    }
    let trivia = new TriviaClass("#id_row",question, shuffle(answers), correct_ans);
    prevQuestion.splice(rnd,1);
}
const updateUi = () => {
    let question_level = document.querySelector("#question_counter");
    question_level.innerHTML = `question : ${level}`;
    let lives_div = document.querySelector("#liveIcon");
    lives_div.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement("span");
        heart.className = "fa fa-heart";
        heart.ariaHidden = "true";
        lives_div.append(heart);
    }
}
/** shuffle array places */
const shuffle = array => {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
init();