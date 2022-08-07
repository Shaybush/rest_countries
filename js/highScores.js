let obj_scores = [];
const init = () => {
    updateUi();
}
const updateUi = () => {
    obj_scores = JSON.parse(localStorage["scoreListCapital"])
    // console.log(obj_scores)
    obj_scores = _.reverse(_.sortBy(obj_scores , "points"));
    document.querySelector("#id_tbody").innerHTML = "";
    obj_scores.forEach((element, index) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${element.fullName}</td>
        <td>${element.points}</td>
        <td>Top ${index+1}</td>
      `
      document.querySelector("#id_tbody").append(tr);
    });
}



init();