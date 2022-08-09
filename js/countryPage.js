class CountryPage {
    constructor(_parent, _item , _index) {
        this.parent = _parent;
        this.name = _item.name;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.img = _item.flag;
        this.language = _item.languages[0].name;
        this.region = _item.region;
        this.capital = _item.capital;
        this.index = _index;
        this.render();
    }
    render() {
        // add options to search (input with select)
        let div = document.createElement("div");
        div.className = "p-3 d-flex justify-content-center";
        document.querySelector(this.parent).innerHTML = '';
        document.querySelector(this.parent).append(div);
        div.innerHTML = `
        <div class="col-2 prev justify-content-center d-flex align-items-center">
             <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <div>
        <div class="country_img d-flex">
          <img src="${this.img}" alt="country">
        </div>
       <div class="description">
           <h1>Country : ${this.name}</h1>
           <h3>Capital : ${this.capital}</h3>
           <h5>language : ${this.language}</h5>
           <p>Region : ${this.region}</p>
           <p>population : ${this.pop}</p>
       </div>
       </div>
       <div class="col-2 next justify-content-center d-flex align-items-center">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
       </div>
        `
        let back = document.querySelector("#esc_btn");
        let prev = div.querySelector(".prev");
        let next = div.querySelector(".next");
        back.addEventListener("click",()=>{
            document.querySelector("#controls_id").classList.remove("d-none");
            document.querySelector("#esc_id").classList.add("d-none");
            createCountries(lastSearch,lastSelect);
        })
        prev.addEventListener("click", ()=>{
            if(this.index-1>-1){
                let page = new CountryPage(this.parent,countries_List[this.index-1] , this.index-1);
            }
        })
        next.addEventListener("click", ()=>{
            if(this.index+1 !=countries_List.length){
                let page = new CountryPage(this.parent,countries_List[this.index+1] , this.index+1);
            }
        })
    }
}