class Country{
     constructor(_name,_pop,_img,_region,_capital){
        this.name = _name;
        this.pop = `${Math.floor((_pop / 1000000)* 100) / 100}M`;
        this.img = _img;
        this.region = _region;
        this.capital = _capital;
    }
    render(){
        // add options to search (input with select)
        let option = document.createElement("option");
        option.value = this.name;
        document.querySelector("#datalistOptions").append(option);
        // create country box
        let myDiv = document.createElement("div");
        myDiv.className = "box col-12 col-md-4 border border-info p-2 d-flex mb-2";
        document.querySelector("#id_row").append(myDiv);
        myDiv.innerHTML +=`
        <img style="margin-right: 8px;" src="${this.img}" alt="${this.name}" width="150" height="100">
        <div class="description">
            <h5 class="text-primary">${this.name}</h5>
            <h6>capital : ${this.capital}</h6>
            <p class="p-0 m-0">popultion : ${this.pop}</p>
            <span class="p-0 m-0">Region : ${this.region}</span>
        </div>
        `
    }
}