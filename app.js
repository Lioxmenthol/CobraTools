const HERO_JSON =
"https://lioxmenthol.github.io/Auto/hero.json";

const SKIN_JSON =
"https://lioxmenthol.github.io/Auto/ml.json";

let allHeroes=[];
let allSkins={};

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

fetch(HERO_JSON)
.then(r=>r.json())
.then(data=>{

allHeroes=data;
renderHeroes(data);

});

fetch(SKIN_JSON)
.then(r=>r.json())
.then(data=>{

allSkins=data;

});

function renderHeroes(data){

heroList.innerHTML="";

data.forEach(hero=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`
<img src="${hero.URL}">
<div class="card-title">
${hero.her}
</div>
`;

card.onclick=()=>{

openHero(hero.her);

};

heroList.appendChild(card);

});

}

function openHero(heroName){

heroPage.style.display="none";
skinPage.style.display="block";

heroTitle.innerText=heroName;

skinList.innerHTML="";

Object.values(allSkins).forEach(skin=>{

if(skin.hero!==heroName) return;

const card=document.createElement("div");

card.className="card";

card.innerHTML=`
<img src="${skin.img}">
<div class="card-title">
${skin.skin_name}
</div>

<a class="download-btn"
href="#"
onclick="downloadSkin('${skin.url}')">
DOWNLOAD
</a>
`;

skinList.appendChild(card);

});

}

document.getElementById("backBtn")
.onclick=()=>{

skinPage.style.display="none";
heroPage.style.display="block";

};

document.getElementById("searchBox")
.addEventListener("input",e=>{

const key=
e.target.value.toLowerCase();

renderHeroes(

allHeroes.filter(h=>
h.her.toLowerCase()
.includes(key)
)

);

});

function downloadSkin(url){

window.location.href=
"cobratools://download?url="
+ encodeURIComponent(url);

}