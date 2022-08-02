let questions, counter = 0, lives, level;
// all the players scores
let scoresL = [];
// get countries from the api request
let countries_List = [];
window.onload = () => {
    lives = 5;
    level = 0;
    getCountry();
    updateUi();
}
// async function getCountry() {
//     let url = "https://api.jsonbin.io/v3/b/62e240f88ebcdb7588453b4e"
//     axios.get(url,{
//         headers: {
//           "X-Master-Key": "$2b$10$qX5KcsGIkrTwK8ydTZQsp.GbFVAdhGMJgBRDjR7IBw6TCWSZbWI12",
//         }
//       })
//     .then(function(resp){
//         // console.log(resp.data);
//         initialize(resp.data);
//       })
// }
/** get the api of rest countries */
function getCountry() {
    let url = "https://restcountries.com/v2/all"
    axios.get(url)
        .then(function (resp) {
            console.log(resp.data);
            countries_List = resp.data.filter(country => country.capital && Math.floor(((country.population / 1000000) * 100) / 100) > 0);
            build_trivia();
        })
        .catch(function () {
            console.log("cannot find your data")
        })
}
class Trivia {
    constructor(_country, _answersArr, _correctAns) {
        // console.log(`${_country}\n${_answersArr}\n${_correctAns}`)
        //get country's index
        this.country = _country;
        //get array of random answers
        this.answers = _answersArr;
        // console.log(this.answers);
        this.correctAns = _correctAns;
        this.render();
    }
    render() {
        document.querySelector("#id_question").innerHTML = `
        <h2 class = "display-4 mb-2">
        What is the capital of ${countries_List[this.country].name} ?
        </h2>
        <div class="img_box mx-auto mt-2 mb-3" style="width: 200px;">
        <img src='${countries_List[this.country].flag}' style="box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);" width="100%">
        </div>
        
        `
        document.querySelector("#id_row").innerHTML = `
            <div class="box p-2 col-12 col-lg-5">
            <button id="answer1" class="btn btn-dark w-100">${this.answers[0]}</button>
            </div>
            <div class="box p-2 col-12 col-lg-5">
            <button id="answer2" class="btn btn-dark w-100">${this.answers[1]}</button>
            </div>
            <div class="box p-2 col-12 col-lg-5">
            <button id="answer3" class="btn btn-dark w-100">${this.answers[2]}</button>
            </div>
            <div class="box p-2 col-12 col-lg-5">
            <button id="answer4" class="btn btn-dark w-100">${this.answers[3]}</button> 
            </div>
        `;
        // help flag for click once
        let flag = false;
        document.body.style.background = "white";
        // listener to each button click from the answers start
        let btn1 = document.querySelector("#answer1")
        let btn2 = document.querySelector("#answer2")
        let btn3 = document.querySelector("#answer3")
        let btn4 = document.querySelector("#answer4")
        let btns_ar = [btn1, btn2, btn3, btn4];
        btns_ar.forEach((e) => {
            e.addEventListener("click", () => {
                if (!flag) {
                    flag = true;
                    // the rest in red
                    e.style.background = "red";
                    if (e.innerHTML == this.correctAns) {
                        e.style.background = "green";
                        document.body.style.background = "lightgreen";
                        level++;
                        updateUi();
                        setTimeout(function () {
                            build_trivia()
                        }, 2000);
                    }
                    else {
                        level++;
                        lives--;
                        if (lives == 0) {
                            let obj = {
                                "score": level
                            }
                            // scoresL.push(obj);
                            // localStorage.setItem("scoreList",JSON.stringify(scoresL));
                            alert("Game Over");
                            window.open('../index.html');
                        }
                        document.body.style.background = "rgb(255, 104, 104)";
                        updateUi();
                        e.style.background = "red";
                        setTimeout(function () {
                            build_trivia()
                        }, 2000);
                    }
                }
            })
        })
        // listener to each button click from the answers close
    }

}


function checkLocal() {
    if (localStorage["scoreList"]) {
        console.log(localStorage["scoreList"]);
        scoresL = JSON.parse(localStorage["scoreList"]);
    }
}

function build_trivia() {
    // filter countries if: capital == true && population bigger than 0M
    const countries = countries_List;
    let rnd = Math.floor(Math.random() * countries.length);
    // random question (country.capital)
    let answer1 = countries[Math.floor(Math.random() * countries.length)].capital;
    let answer2 = countries[Math.floor(Math.random() * countries.length)].capital;
    let answer3 = countries[Math.floor(Math.random() * countries.length)].capital;
    // console.log(`answer1 : ${answer1} answer2 : ${answer2} answer3 : ${answer3}`)
    let answers = [countries[rnd].capital, answer1, answer2, answer3];
    let correct_ans = countries[rnd].capital;
    // console.log(`${name} \n ${shuffle(answers)} \n ${correct_ans}`)
    let trivia = new Trivia(rnd, shuffle(answers), correct_ans);
    // trivia.render();
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
