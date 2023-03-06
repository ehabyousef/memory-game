document.querySelector(".control-buttons span").onclick = function () {
  let yourname = prompt("what's your name");

  if (yourname == null || yourname == "") {
    document.querySelector(".name span").innerHTML = "unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourname;
  }
  document.querySelector(".control-buttons").remove();
  let allblock = document
    .querySelectorAll(".game-block")
    .forEach((ab, index) => {
      ab.classList.add("animated");
    });
  // console.log(allblock);
};
let duration = 1000;
let blockcontainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockcontainer.children);
let orderrange = [...Array(blocks.length).keys()];
// console.log(orderrange);
shuffle(orderrange);
blocks.forEach((block, index) => {
  block.style.order = orderrange[index];
  block.addEventListener("click", function () {
    flipblock(block);
  });
});
function flipblock(selectedblock) {
  selectedblock.classList.add("is-flipped");
  let allflippedblocsk = blocks.filter((flippedblock) =>
    flippedblock.classList.contains("is-flipped")
  );
  if (allflippedblocsk.length === 2) {
    stopclicking();
    checkmatched(allflippedblocsk[0], allflippedblocsk[1]);
  }
}
function stopclicking() {
  blockcontainer.classList.add("no-clicking");
  setTimeout(() => {
    blockcontainer.classList.remove("no-clicking");
  }, duration);
}

function checkmatched(firstblock, secondblock) {
  let tries = document.querySelector(".tries span");
  if (firstblock.dataset.technology == secondblock.dataset.technology) {
    firstblock.classList.remove("is-flipped");
    secondblock.classList.remove("is-flipped");
    firstblock.classList.add("has-match");
    secondblock.classList.add("has-match");
    document.getElementById("success").play();
    let count = 0;
    let allblock = document.querySelectorAll(".game-block");
    let menu = document.querySelector(".finish");
    allblock.forEach((x) => {
      if (x.classList.contains("has-match")) {
        count++;
        console.log(count);
      }
    });
    if (count == 20) {
      menu.style.display = "flex";
      document.getElementById("end").play();
      setTimeout(() => {
        window.location.replace(
          window.location.pathname +
            window.location.search +
            window.location.hash
        );
      }, 2000);
    }
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    if (tries.innerHTML == 10) {
      document.querySelector("#endgame").style.display = "flex";
      document.getElementById("lose").play();
      setTimeout(() => {
        window.location.replace(
          window.location.pathname +
            window.location.search +
            window.location.hash
        );
      }, duration);
      console.log("losing");
    }
    setTimeout(() => {
      firstblock.classList.remove("is-flipped");
      secondblock.classList.remove("is-flipped");
      document.getElementById("fail").play();
    }, duration);
  }
}
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    //get random number
    random = Math.floor(Math.random() * current);
    //decrease number by one
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
// add change mood
let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
