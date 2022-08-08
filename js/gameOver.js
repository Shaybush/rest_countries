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
        <form id="id_form" class="col-6 mx-auto">
        <input id="firstN_id" type="text" aria-label="First name" class="form-control mb-2" placeholder="Name...">
        <input id="lastN_id" type="text" aria-label="Last name" class="form-control mb-2" placeholder="Last Name...">
        <button class="btn btn-dark btn-sm">Save</button>
        </form>
        `
        let input_ln = document.querySelector("#lastN_id");
        let input_fn = document.querySelector("#firstN_id");
        let form = document.querySelector("#id_form");
        form.addEventListener("submit",(e)=>{
            e.preventDefault();

            if(input_ln.value.length<2){
                alert("You required to input 2 letters or more")
                return;
            }
            if(input_fn.value.length<2){
                alert("You required to input 2 letters or more")
                return;
            }
            let fullName = `${input_fn.value} ${input_ln.value}`
            let obj ={
                "fullName" : fullName,
                "points" : this.points
            }
            scoresL.push(obj);
            // setting the local storage
            localStorage.setItem("scoreListCapital",JSON.stringify(scoresL));
            window.open("../index.html");
        })
        // input_ln.addEventListener("keypress",(e)=>{
        //     console.log(e.key);
        //     console.log(e.key == "Enter");
        //     if(e.key == "Enter"){
        //         let fullName = `${input_fn.value} ${input_ln.value}`
        //         let obj ={
        //             "fullName" : fullName,
        //             "points" : this.points
        //         }
        //         scoresL.push(obj);
        //         // setting the local storage
        //         localStorage.setItem("scoreListCapital",JSON.stringify(scoresL));
        //         window.open("../index.html");
        //     }
        // })
    }
}
/** clearing the trivia page */
const clearPage =() =>{
    document.querySelector("#id_row").innerHTML = '';
    document.querySelector("#assert_id").innerHTML = ''
    document.querySelector("#id_question").innerHTML = '';
}