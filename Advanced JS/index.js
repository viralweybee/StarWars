//declaring the variable
const main = document.getElementsByClassName('main')[0];
const overlay = document.getElementsByClassName('overlay')[0];
const imgSrc = document.getElementsByClassName('img');
const main1 = document.getElementsByClassName('main1')
const prev=document.getElementById('prev');
const next=document.getElementById('next');



const pageWiseData = `https://swapi.dev/api/people/?page=${1}`
var promise = fetch(pageWiseData);
promise.then(Response => Response.json())
  .then(function (data) {
    console.log(data);
    var start = data.results[0].url.substring(29, data.results[0].url.length - 1);
    var end;
    main.innerHTML='';
    overlay.innerHTML='';
    for (let i = 0; i < data.results.length; i++) {
      var index = data.results[i].url.substring(29, data.results[i].url.length - 1)
      renderData(index, data.results[i].name); 
      // console.log(data.results[i].name)
      end = index;
    }
    
    let arr = data.results;
    listenEvent(start, end, arr);
    console.log(arr, start, end)
  });

//only rendering data
function renderData(id, arr) {
  var api = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
  let html = `<div class="main1" id="main${id}">
  <div class="img">
      <img src=${api} alt="">
  </div>
  <h2>${arr}</h2>
</div>`
  main.insertAdjacentHTML('beforeend', html);
}

//on click when any event occur   

//  function listenEvent(start, end, arr) {
//   for (let i = start; i <= end; i++) {
//     var particulardiv = document.getElementById(`main${i}`)

//     particulardiv.addEventListener('click', function () {
//       if (flag == 0) {
//         flag = 1;
//         let data1=arr[i-1]

//           var pr= fetch(arr[i-1].homeworld)
//           pr.then(response=>response.json()).then(function(data){
//             console.log(data);
//           })
//           let flim=arr[i-1].films;


//           for(let i=0;i<flim.length;i++){
//             let temp=fetch(flim[i]) 
//             temp.then(response=>response.json()).then(function (data){

//               console.log(data.title) 
//             })
//           }



//           overlay.innerHTML = ''
//           var api = `https://starwars-visualguide.com/assets/img/characters/${i}.jpg`
//           let html = `<div class="overlay1"><div class="container">
//     <img class="overlay-img" src=${api} alt="">
// </div>
// <div class="data">
// <h3>${arr[i - 1].name}</h3>
// <p>BirthYear <span>${arr[i - 1].birth_year}</span></p> 
// <p>Gender <span>${arr[i - 1].gender}</span></p> 
// <p>Species <span>unknown</span></p> 
// <p>HomeWorld <span></span></p> 
// <p>Films <span>Return of the Jedi</span></p> 
// </div> <img  class="close" src="close.png">
//  </div> `
//           overlay.insertAdjacentHTML('beforeend', html);
//           overlay.style.display = 'block';
//           main.style.opacity = '0.1'

//         console.log(flag)
//       }
//       const temp = document.getElementsByClassName('close')[0];
//       temp.addEventListener('click', () => {
//         flag = 0;
//         overlay.style.display = 'none';
//         main.style.opacity = '1'
//       })
//     })
//   }
// }



//async function


// next prev button

let flag = 0;
function listenEvent(start, end, arr) {
  for (let i = start; i <= end; i++) {
    var particulardiv = document.getElementById(`main${i}`)

    particulardiv.addEventListener('click', function () {
      if (flag == 0) {
        flag = 1;
        let data1 = arr[i - 1]
      
        getdata(data1.homeworld,data1.films,i);
      }
      console.log('hii')
    })
  }
}

//show individual movie
async function getdata(arr,arr1, i) {
  overlay.innerHTML = ''
  overlay.style.display = 'block';
  main.style.opacity = '0.1'
  var response = await fetch(arr);
  var data = await response.json();
  console.log(data.name);
  let flim = arr1;

var flimData='';
  for (let i = 0; i < flim.length; i++) {
    let temp =await fetch(flim[i])
    let data1= await temp.json();
    console.log(data1.title);
    flimData+=data1.title+',';
  }
 
  var api = `https://starwars-visualguide.com/assets/img/characters/${i}.jpg`
  let html = `<div class="overlay1"><div class="container">
<img class="overlay-img" src=${api} alt="">
</div>
<div class="data">
<h3>${arr.name}</h3>
<p>BirthYear <span>${arr.birth_year}</span></p> 
<p>Gender <span>${arr.gender}</span></p> 
<p>Species <span>unknown</span></p> 
<p>HomeWorld <span>${data.name}</span></p> 
<p>Films <span>${flimData}</span></p> 
</div> <img  class="close" src="close.png">
</div> `
  overlay.insertAdjacentHTML('beforeend', html);
 
   const temp = document.getElementsByClassName('close')[0];
      temp.addEventListener('click', () => {
        flag = 0;
        overlay.style.display = 'none';
        main.style.opacity = '1'
      })
}


//prev next button
// var page=1;
// prev.addEventListener('click',function(){
//   Flag=false;
//   if(page==1){
//     page=10;
//   }
//   page--;
//   starWar(page);
// })
// next.addEventListener('click',function(){
//   Flag=false;
//   if(page==9){
//     page=0;
//   }
//   page++;
//   starWar(page);
// })
