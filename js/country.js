class Country{
     constructor(_parent,_item){
        // item.name, item.population, item.flag, item.region, item.capital
        this.item = _item;
        this.parent = _parent;
        this.name = _item.name;
        this.img = _item.flag;
        this.region = _item.region;
        this.capital = _item.capital;
        this.render();
    }
    render(){
        // add options to search (input with select)
        let option = document.createElement("option");
        option.value = this.name;
        document.querySelector("#datalistOptions").append(option);
        // create country box
        let myDiv = document.createElement("div");
        myDiv.className = "box col-12 col-md-4 border border-info p-2 d-flex mb-2";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML +=`
        <img style="margin-right: 8px;" src="${this.img}" alt="${this.name}" width="150" height="100">
        <div class="description">
            <h5 class="text-primary">${this.name}</h5>
            <h6>capital : ${this.capital}</h6>
            <p>Region : ${this.region}</p>
            <button class="btn btn-info btn-sm more_btn">More info</button>
        </div>
        `
        let btn = myDiv.querySelector(".more_btn");
        btn.addEventListener("click",()=>{
            let page = new CountryPage(this.parent,this.item);
        })
            
    }
}