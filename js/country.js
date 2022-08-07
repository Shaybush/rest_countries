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
        myDiv.className = "p-2 col-12 col-md-4";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML +=`
        <div class="card h-100">
          <div class="img_box">
          <img src="${this.img}" class="card-img-top" alt="${this.name}">
          </div>
          <div class="card-body">
              <h5 class="card-title text-primary">${this.name}</h5>
              <p class="card-text">Capital : ${this.capital}</p>
              <a href="#" class="btn btn-secondary more_btn">More Info</a>
          </div>
      </div>
        `
        let btn = myDiv.querySelector(".more_btn");
        btn.addEventListener("click",()=>{
            let page = new CountryPage(this.parent,this.item);
        })
            
    }
}