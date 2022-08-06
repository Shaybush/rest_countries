class CountryPage {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.name = _item.name;
        this.pop = `${Math.floor((_item.population / 1000000) * 100) / 100}M`;
        this.img = _item.flag;
        this.language = _item.languages[0].name;
        this.region = _item.region;
        this.capital = _item.capital;
        this.render();
    }
    render() {
        // add options to search (input with select)
        let div = document.createElement("div");
        div.className = "p-3 d-flex justify-content-center";
        document.querySelector(this.parent).innerHTML = '';
        document.querySelector(this.parent).append(div);
        div.innerHTML = `
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
        `
    }
}