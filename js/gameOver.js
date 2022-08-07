class GameOver{
    constructor(_parent,_points){
        this.parent = _parent;
        this.points =_points;
        this.render();
    }
    render(){
        clearPage();
        // creating game over page
        let inputG = document.createElement("div");
        inputG.className = "input-group";
        document.querySelector(this.parent).append(inputG);
        inputG.innerHTML =`
        <span class="input-group-text">First and last name</span>
        <input id="firstN_id" type="text" aria-label="First name" class="form-control">
        <input id="lastN_id" type="text" aria-label="Last name" class="form-control">
        <button id="submit" class="btn btn-dark btn-sm">Save</button>
        `
        let submit = document.querySelector("#submit");
        submit.addEventListener("click",()=>{
            let fullName = `${document.querySelector("#firstN_id").value} ${document.querySelector("#lastN_id").value}`
            let obj ={
                "fullName" : fullName,
                "points" : this.points
            }
            scoresL.push(obj);
            // setting the local storage
            localStorage.setItem("scoreListCapital",JSON.stringify(scoresL));
            window.open("../index.html");
        })
    }
}
/** clearing the trivia page */
const clearPage =() =>{
    document.querySelector("#id_row").innerHTML = '';
    document.querySelector("#assert_id").innerHTML = ''
    document.querySelector("#id_question").innerHTML = '';
}