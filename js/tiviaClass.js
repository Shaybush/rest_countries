class TriviaClass {
    constructor(_country, _answersArr, _correctAns) {
        // console.log(`${_country}\n${_answersArr}\n${_correctAns}`)
        //get country's index
        this.country = _country;
        //get array of random answers
        this.answers = _answersArr;
        this.correctAns = _correctAns;
        this.render();
    }
    render() {
        document.querySelector("#id_question").innerHTML = `
        <h2 class = "display-4 mb-2">
        What is the capital of ${this.country.name} ?
        </h2>
        <div class="img_box mx-auto mt-2 mb-3" style="width: 200px;">
        <img src='${this.country.flag}' style="box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);" width="100%">
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
                        points++;
                        updateUi();
                        setTimeout(function () {
                            build_trivia()
                        }, 2000);
                    }
                    else {
                        level++;
                        lives--;
                        if (lives == 0 ||prevQuestion.length == 4) {
                            let gameOver = new GameOver("#id_question",points);
                            return;
                            // window.open('../index.html');
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