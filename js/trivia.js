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
function getCountry() {
    let url = "https://restcountries.com/v2/all"
    axios.get(url)
        .then(function (resp) {
            countries_List = resp.data.filter(country => country.capital && Math.floor(((country.population / 1000000) * 100) / 100) > 0);
            prevQuestion = [...countries_List];
            // console.log(prevQuestion)
            build_trivia();
        })
        .catch(function () {
            console.log("cannot find your data")
        })
}

function checkLocal() {
    if (localStorage["scoreListCapital"]) {
        scoresL = JSON.parse(localStorage["scoreListCapital"]);
    }
}

function build_trivia() {
    // filter countries if: capital == true && population bigger than 0M
    // const countries = countries_List;
    let rnd_ar = [];
    let counter = 0;
    let rnd = Math.floor(Math.random() * prevQuestion.length);
    let correct_ans = prevQuestion[rnd].capital;
    let question = prevQuestion[rnd];
    let answers = [prevQuestion[rnd].capital];
    rnd_ar.push(rnd);
    console.log(rnd);
    console.log(prevQuestion[rnd].capital);

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
    console.log(answers);
    
    let trivia = new TriviaClass(question, shuffle(answers), correct_ans);
    prevQuestion.splice(rnd,1);
}
function updateUi() {
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
function shuffle(array) {
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