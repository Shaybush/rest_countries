class TriviaClass {
    constructor(_parent,_country, _answersArr, _correctAns) {
        // console.log(`${_country}\n${_answersArr}\n${_correctAns}`)
        //get country's index
        this.parent =_parent;
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
        document.querySelector(this.parent).innerHTML = '';
        this.answers.forEach((item,i)=>{
            document.querySelector(this.parent).innerHTML +=`
            <div class="box p-2 col-12 col-lg-5">
            <button id="answer${i+1}" class="btn btn-dark w-100">${this.answers[i]}</button>
            </div>
            `
        })
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
                        setTimeout(function () {
                            build_trivia()
                            updateUi();
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
                        // if answer == correctAsnwer than the background change green else red
                        btns_ar.forEach((e) => {
                            e.style.background = e.innerHTML == this.correctAns ? "green" : "red";
                        })
                        // e.style.background = "red";
                        setTimeout(function () {
                            build_trivia()
                            updateUi();
                        }, 2000);
                    }
                }
            })
        })
        // listener to each button click from the answers close
    }
}