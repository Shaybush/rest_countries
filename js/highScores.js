let obj_scores = [];
const init = () => {
    updateUi();
}
const updateUi = () => {
    obj_scores = JSON.parse(localStorage["scoreListCapital"])
    document.querySelector("#id_tbody").innerHTML = "";
    obj_scores.forEach(element => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${element.fullName}</td>
        <td>${element.points}</td>
        <td>Top 1</td>
      `
      document.querySelector("#id_tbody").append(tr);
    });
}



init();