const leftBtn = document.querySelector(".fa-arrow-alt-circle-left");
const rightBtn = document.querySelector(".fa-arrow-alt-circle-right");

const parentPage = document.querySelectorAll("#jsPageNumber");
const pageCount = document.querySelector(".countPage");

let pageNumber = parentPage.length;

let count = parseInt(pageCount.innerText);

if (parseInt(window.location.href.split("main/")[1]) > pageNumber) {
  alert("존재하지않는 경로입니다.");
  window.history.back();
} else if (parseInt(window.location.href.split("main/")[1]) < 1) {
  alert("존재하지않는 경로입니다.");
  window.history.back();
}

let page = [];
for (let i = 0; i < parentPage.length; i++) {
  page[i] = parentPage[i];
}

if (pageNumber > 1 && count !== 0) {
  let startNumber = count - 1;
  let lastNumber = count + 1;
  if (lastNumber > pageNumber) {
    lastNumber = count;
  }
  for (let i = 0; i < startNumber; i++) {
    page[i].classList.add("hide");
  }
  for (let i = startNumber; i < lastNumber; i++) {
    page[i].classList.remove("hide");
  }
  for (let i = lastNumber; i < pageNumber; i++) {
    page[i].classList.add("hide");
  }
} else {
  for (let i = 2; i < pageNumber; i++) {
    page[i].classList.add("hide");
  }
}

const passRight = () => {
  count += 2;
  if (count === 8) {
    window.location.replace(`http://localhost:4000/board/main/${pageNumber}`);
    alert("마지막페이지입니다.");
  } else {
    window.location.replace(`http://localhost:4000/board/main/${count}`);
  }
};

const passLeft = () => {
  count -= 2;
  if (count === 0) {
    window.location.replace(`http://localhost:4000/board/main/1`);
  } else {
    window.location.replace(`http://localhost:4000/board/main/${count}`);
  }
};

if (count !== pageNumber - 1) {
  rightBtn.addEventListener("click", passRight);
}

if (count !== 1) {
  leftBtn.addEventListener("click", passLeft);
}
