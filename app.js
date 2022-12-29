function shuffle(a, b, c, d) {
  c = a.length;
  while (c)
    (b = (Math.random() * c--) | 0), (d = a[c]), (a[c] = a[b]), (a[b] = d);
}

var itemsArr = [
  '<div class="item" draggable="true" data-name="1">A</div>',
  '<div class="item" draggable="true" data-name="2">B</div>',
  '<div class="item" draggable="true" data-name="3">C</div>',
  '<div class="item" draggable="true" data-name="4">D</div>',
  '<div class="item" draggable="true" data-name="5">E</div>',
];

var targetsArr = [
  '<div class="target" data-name="1">A</div>',
  '<div class="target" data-name="2">B</div>',
  '<div class="target" data-name="3">C</div>',
  '<div class="target" data-name="4">D</div>',
  '<div class="target" data-name="5">E</div>',
];

shuffle(itemsArr);
shuffle(targetsArr);

document.getElementById("items").innerHTML = itemsArr.join("");
document.getElementById("targets").innerHTML = targetsArr.join("");

const items = document.querySelectorAll(".item");
const targets = document.querySelectorAll(".target");

function assignPositions(elements) {
  const positions = [];
  for (let i = 0; i < elements.length; i++) {
    positions.push(i * 150);
  }
  shuffle(positions);
  elements.forEach((element, index) => {
    element.style.top = `${positions[index]}px`;
    element.style.left = `${positions[index]}px`;
  });
}

assignPositions(items);
assignPositions(targets);

console.log(items);

items.forEach((item) => {
  item.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData(
      "text/plain",
      event.target.getAttribute("data-name")
    );
  });

  item.addEventListener("drag", function (event) {
    event.preventDefault();
  });

  item.addEventListener("dragend", function (event) {
    event.preventDefault();
  });
});

targets.forEach((target) => {
  target.addEventListener("dragenter", function (event) {
    event.preventDefault();
  });

  target.addEventListener("dragleave", function (event) {
    event.preventDefault();
  });

  target.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // 1.Kod bloğu
  target.addEventListener("drop", function (event) {
    event.preventDefault();
    const name = event.dataTransfer.getData("text/plain");
    if (name === event.target.getAttribute("data-name")) {
      event.target.appendChild(document.querySelector(`[data-name="${name}"]`));
      document.querySelector(`[data-name="${name}"]`).classList.add("matched");
      document
        .querySelector(`[data-name="${name}"]`)
        .classList.remove("mismatched");
      document.querySelector(`[data-name="${name}"]`).style.top = "";
      document.querySelector(`[data-name="${name}"]`).style.left = "";
      if (document.querySelectorAll(".matched").length === targets.length) {
        document.getElementById("finish").innerHTML = "Finish";
      }
    } else {
      document.querySelector(`[data-name="${name}"]`).style.top = "";
      document.querySelector(`[data-name="${name}"]`).style.left = "";
      document
        .getElementsByClassName(`[data-name="${name}"]`)
        .classList.remove("mismatched");
    }
  });
});

//For restart game
const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click", function () {
  location.reload();
});


// 2.Kod bloğunu açıp 1.Kod bloğunu kapatırsanız eşleşen seçenekler doğru eşleştiklerinde yeşil yanlış eşleştiklerinde kırmızı olur...

//2.Kod bloğu
// target.addEventListener("drop", function (event) {
//   event.preventDefault();
//   const name = event.dataTransfer.getData("text/plain");
//   if (name === target.getAttribute("data-name")) {
//     event.target.classList.add("matched");
//     event.target.classList.remove("mismatched");
//   } else {
//     event.target.classList.add("mismatched");
//     event.target.classList.remove("matched");
//   }
// });
// });
