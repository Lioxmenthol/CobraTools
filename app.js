const HERO_JSON =
"https://lioxmenthol.github.io/Auto/hero.json";

const SKIN_JSON =
"https://lioxmenthol.github.io/Auto/ml.json";

let allHeroes = [];
let allSkins = {};

const heroList =
document.getElementById("heroList");

const skinList =
document.getElementById("skinList");

const heroPage =
document.getElementById("heroPage");

const skinPage =
document.getElementById("skinPage");

const heroTitle =
document.getElementById("heroTitle");

// ======================
// LOAD HERO
// ======================
fetch(HERO_JSON)
.then(r => r.json())
.then(data => {

```
allHeroes = data;

renderHeroes(data);
```

})
.catch(err => {

```
console.log(err);
```

});

// ======================
// LOAD SKIN
// ======================
fetch(SKIN_JSON)
.then(r => r.json())
.then(data => {

```
allSkins = data;
```

})
.catch(err => {

```
console.log(err);
```

});

// ======================
// HERO LIST
// ======================
function renderHeroes(data){

```
heroList.innerHTML = "";

data.forEach(hero => {

    const card =
    document.createElement("div");

    card.className = "card";

    card.innerHTML = `
    <img
    src="${hero.URL}"
    loading="lazy"
    onerror="this.src='https://via.placeholder.com/300x300?text=Hero'">

    <div class="card-title">
    ${hero.her}
    </div>
    `;

    card.onclick = () => {

        openHero(hero.her);

    };

    heroList.appendChild(card);

});
```

}

// ======================
// OPEN HERO
// ======================
function openHero(heroName){

```
history.pushState(
{
    page:"skin",
    hero:heroName
},
"",
"#" + heroName
);

heroPage.style.display = "none";
skinPage.style.display = "block";

heroTitle.innerText = heroName;

skinList.innerHTML = "";

Object.values(allSkins)
.forEach(skin => {

    if(skin.hero !== heroName) return;

    const card =
    document.createElement("div");

    card.className = "card";

    card.innerHTML = `
    <img
    src="${skin.img}"
    loading="lazy"
    onerror="this.src='https://via.placeholder.com/300x300?text=Skin'">

    <div class="card-title">
    ${skin.skin_name}
    </div>

    <a
    class="download-btn"
    href="#"
    onclick="downloadSkin('${skin.url}');return false;">
    DOWNLOAD
    </a>
    `;

    skinList.appendChild(card);

});
```

}

// ======================
// BACK BUTTON WEBSITE
// ======================
document.getElementById("backBtn")
.onclick = () => {

```
history.back();
```

};

// ======================
// BACK BUTTON HP
// ======================
window.addEventListener(
"popstate",
function(){

```
heroPage.style.display =
"block";

skinPage.style.display =
"none";
```

}
);

// ======================
// SEARCH HERO
// ======================
document.getElementById("searchBox")
.addEventListener(
"input",
e => {

```
const key =
e.target.value
.toLowerCase();

renderHeroes(

    allHeroes.filter(h =>

        h.her
        .toLowerCase()
        .includes(key)

    )

);
```

}
);

// ======================
// DOWNLOAD
// ======================
function downloadSkin(url){

```
try{

    window.location.href =
    "cobratools://download?url="
    + encodeURIComponent(url);

}catch(e){

    alert(
    "Cobra Tools belum terinstall"
    );

}
```

}
