console.log("Journal");
showStories();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let stories = localStorage.getItem("stories");
  if (stories == null) {
    storiesObj = [];
  } else {
    storiesObj = JSON.parse(stories);
  }

  let entry = {
    story: addTxt.value,
    date: new Date().toLocaleDateString() 
  };

  storiesObj.push(entry);
  localStorage.setItem("stories", JSON.stringify(storiesObj));
  addTxt.value = "";
  console.log(storiesObj);
  showStories();
});

function showStories() {
  let stories = localStorage.getItem("stories");
  if (stories == null) {
    storiesObj = [];
  } else {
    storiesObj = JSON.parse(stories);
  }
  let html = "";
  storiesObj.forEach(function (element, index) {
    html += `
      <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Entry #${index + 1}</h5>
          <p class="card-text">${element.story}</p>
          <p class="card-date">Date: ${element.date}</p> <!-- Display the date -->
          <button id="delete" onclick="deleteStory(this.id)" class="btn btn-primary">Delete Entry</button>
        </div>
      </div>`;
  });
  let storiesElm = document.getElementById("stories");
  if (storiesObj.length != 0) {
    storiesElm.innerHTML = html;
  } else {
    storiesElm.innerHTML = "";
  }
}

function deleteStory(index) {
  let stories = localStorage.getItem("stories");
  if (stories == null) {
    storiesObj = [];
  } else {
    storiesObj = JSON.parse(stories);
  }

  storiesObj.splice(index, 1);
  localStorage.setItem("stories", JSON.stringify(storiesObj));
  showStories();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let storyCards = document.getElementsByClassName('noteCard');
  Array.from(storyCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
