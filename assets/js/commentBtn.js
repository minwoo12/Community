const plusReComment = document.querySelectorAll("#jsAddBtn");
const addBoardReComment = document.querySelectorAll(".jsAddBoardReComment");

handlePlusBtn = index => {
  if (addBoardReComment[index].classList.contains("hide")) {
    addBoardReComment[index].classList.remove("hide");
  } else {
    addBoardReComment[index].classList.add("hide");
  }
};

for (let i = 0; i < plusReComment.length; i++) {
  plusReComment[i].addEventListener("click", countIndex);
  function countIndex() {
    plusReComment[i].index = i;
    const index = this.index;
    handlePlusBtn(index);
  }
}
