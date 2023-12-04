//declaring the variable
const main = document.getElementsByClassName("main")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const imgSrc = document.getElementsByClassName("img");
const main1 = document.getElementsByClassName("main1");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const h3=document.getElementsByClassName('h3')[0]


//intital page when you open a star page website
var Flag = true;
if (Flag) {
  starWar(1);
}
function starWar(page) {
  const pageWiseData = "https://swapi.dev/api/people/?page=" + page;
  
  var promise = fetch(pageWiseData);
  promise
    .then((Response) => Response.json())
    .then(function (data) {
        h3.textContent='page '+page 
      console.log(data);
      var start = data.results[0].url.substring(
        29,
        data.results[0].url.length - 1
      );
      var end;
      main.innerHTML = "";
      overlay.innerHTML = "";
      for (let i = 0; i < data.results.length; i++) {
        var index = data.results[i].url.substring(
          29,
          data.results[i].url.length - 1
        );
        renderData(index, data.results[i].name);
        end = index;
      }
      let arr = data.results;
      listenEvent(start, end, arr);
    });
}

//only rendering data
function renderData(id, name) {
  var api = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  let html = `<div class="main1" id="main${id}">
  <div class="img">
      <img src=${api} alt="">
  </div>
  <h2>${name}</h2>
</div>`;
  main.insertAdjacentHTML("beforeend", html);
}

//when starwar click event occur
let flag = 0;
function listenEvent(start, end, arr) {
  for (let i = 0; i < main1.length; i++) {
    main1[i].addEventListener("click", function () {
      if (flag == 0) {
        flag = 1;
        let string = main1[i].id;
        let s = string.substring(4);
        let data1 = arr[i];
        getdata(data1, s);
      }
    });
  }
}

//get the data when click event occur 
async function getdata(arr, i) {
  overlay.innerHTML = "";
  overlay.style.display = "block";
  main.style.opacity = "0.1";


  //species
  var species="";
  var emptySpecies=false;
for(let i=0;i<arr.species.length;i++){
  emptySpecies=true;
  var apiSpecies=await fetch(arr.species[i]);
  var data2=await apiSpecies.json();
 if(i!=arr.species.length-1){
  species+=data2.name+', ';
 }
 else{
  species+=data2.name;
 }
}
if(!emptySpecies){
  species="unknown";
}
 
  //homeworld
  var response = await fetch(arr.homeworld);
  var data = await response.json();
  console.log(data.name);
  let flim = arr.films;

  //flims 
  var flimData = "";
  for (let i = 0; i < flim.length; i++) {
    let temp = await fetch(flim[i]);
    let data1 = await temp.json();
    console.log(data1.title);
    if(i!=flim.length-1){
    flimData += data1.title + ",";
    }
    else{
      flimData+=data1.title
    }
  }

  var api = `https://starwars-visualguide.com/assets/img/characters/${i}.jpg`;
  let html = `<div class="overlay1"><div class="container">
<img class="overlay-img" src=${api} alt="">
</div>
<div class="data">
<h3>${arr.name}</h3>
<p>BirthYear - <span>${arr.birth_year}</span></p> 
<p>Gender : <span>${arr.gender}</span></p> 
<p>Species : <span>${species}</span></p> 
<p>HomeWorld : <span>${data.name}</span></p> 
<p>Films : <span>${flimData}</span></p> 
</div> <img   class="close" src="close.png">
</div> `;
  overlay.insertAdjacentHTML("beforeend", html);

  const temp = document.getElementsByClassName("close")[0];
  temp.addEventListener("click", () => {
    flag = 0;
    overlay.style.display = "none";
    main.style.opacity = "1";
  });
}

// prev next button
var page = 1;
prev.addEventListener("click", function () {
  if(flag==1){
    overlay.style.display="none";
    main.style.opacity="1"
    flag=0;
  }
  Flag = false;
  if (page == 1) {
    page = 10;
  }
  page--;
  starWar(page);
});

next.addEventListener("click", function () {
  if(flag==1){
    overlay.style.display="none";
    main.style.opacity="1"
    flag=0;
  }
  Flag = false;
  if (page == 9) {
    page = 0;
  }
  page++;
  starWar(page);
});