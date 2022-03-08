import { uRL_API_KEY, iMGUR_API_KEY } from "../in.js";

var timeId;
let list_box = document.getElementById("search-items");

function debounce(func, delay) {
  if (timeId) {
    clearInterval(timeId);
  }
  timeId = setTimeout(() => {
    func();
  }, delay);
}

async function main() {
  let name = document.getElementById("din").value;
  if (name.length > 0) {
    let res = await search(name);
    let data = res.Search;
    listAppend(data);
  } else {
    list_box.style.visibility = "hidden";
  }
}

async function search(name) {
  try {
    let res = await fetch(
      `https://www.omdbapi.com/?s=${name}&apikey=${uRL_API_KEY}`
    );
    let data = await res.json();
    return data;
  } catch (e) {
    console.log("Error: " + e);
  }
}

function listAppend(data) {
  list_box.style.visibility = "visible";
  list_box.innerHTML = null;
  data.forEach((a) => {
    let list = document.createElement("li");
    list.textContent = a.Title;
    list_box.append(list);
  });
}

let container = document.querySelector(".grid-scroll");
var page = 1;
async function getdat() {
  const data = await fetch(`https://api.imgur.com/3/gallery/hot/viral/2`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${iMGUR_API_KEY}`,
    },
  });

  let main = await data.json();
  let filterdata = main.data.filter((a) => {
    if (
      a.images !== undefined &&
      (a.images[0].type === "image/jpeg" ||
        a.images[0].type === "image/gif" ||
        a.images[0].type === "image/png")
    ) {
      return a;
    }
  });
  showImage(filterdata);
}

getdat();

function showImage(data) {
  data.forEach((item) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = item.images[0].link;
    let title = document.createElement("p");
    title.className = "title";
    title.innerText = item.title;
    title.style.color = "#ffffff";

    let ComLikCha = document.createElement("div");
    ComLikCha.innerHTML = `
    <div class="ComLikeDiv" > <span> <i class="material-icons thumb-up">
    arrow_upward
</i>${item.score}</span> 
<span> <i class="material-icons thumb-up">
chat_bubble
</i>${item.comment_count}</span> 
<span> <i class="material-icons thumb-up">
visibility
</i>${item.views}</span> 
</div>
   `;

    div.append(img, title, ComLikCha);
    container.insertAdjacentElement("beforeend", div);
  });
}
//timeout
function showData() {
  setTimeout(() => {
    page++;
    // getdat();
  }, 200);
}
window.addEventListener("scroll", () => {
  //default

  let scrollbar = document.querySelector(".navHome-main");

  if (document.documentElement.scrollTop > 350) {
    scrollbar.classList.add("navHome-active");
  } else {
    scrollbar.classList.remove("navHome-active");
  }

  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    showData();
  }
});

// let urlString = window.location.href;
// let token = urlString.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
