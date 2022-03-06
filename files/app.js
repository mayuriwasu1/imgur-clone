

var timeId;
let list_box=document.getElementById("search-items");


function debounce(func,delay) {
    
  if(timeId){
      clearInterval(timeId);
  }

  timeId=setTimeout(()=>{
      func();
  },delay)
}

async function main(){
  let name=document.getElementById("din").value;
  if(name.length > 0){
      
      let res=await search(name);
      let data=res.Search;
      listAppend(data);
  }else{
      list_box.style.visibility="hidden";
  }

}

async function search(name){
  try{
      let res = await fetch(`https://www.omdbapi.com/?s=${name}&apikey=4b125d6`);
      let data=await res.json();
      return data;
  }catch(e){
      console.log("Error: " + e)
  }
}

function listAppend(data){
  list_box.style.visibility="visible";
  list_box.innerHTML=null;
  data.forEach(a=>{
      let list=document.createElement("li");
      list.textContent =a.Title;
      list_box.append(list)
  })

}



const container = document.querySelector('.grid-scroll');
var page = 1; 
// default img
const loadImage = async () => {
    let res = await fetch(
      `https://api.unsplash.com/photos/?client_id=xcUUJf1lrIO_d5FCizTpQQZjBWL2Pa8Q8-aWSPiuzdQ&per_page=15&page=${page}`
    );
    let data = await res.json();
    showImage(data);
  };
  loadImage();
// info of default
function showImage(items) {
    items.forEach((item) => {
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.src = item.urls.small;
      let title = document.createElement("p");
      title.innerText = item.description;
      title.style.color = "#ffffff";
      title.style.fontSize = "1.4vw";
      div.append(img, title);
      container.insertAdjacentElement("beforeend", div);
    });
  }
//timeout 
function showData(){
    setTimeout(()=>{
        page++;
        loadImage();
    }, 200)
}
window.addEventListener('scroll', ()=>{
    //default 
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if(scrollTop+clientHeight >= scrollHeight){
        showData()
    }

})
