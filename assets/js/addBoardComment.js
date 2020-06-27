import axios from "axios";

export const addBoardComment = document.getElementById("jsAddBoardComment");

const sendBoardComment = async comment => {
  const boardId = window.location.href.split("/board/")[1];
  const response = await axios({
    url: `/api/${boardId}/boardComment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log(response);
  if (response.status === 200) {
    window.location.reload();
  }
};

const handleBoardComment = event => {
  event.preventDefault();
  const commentInput = addBoardComment.querySelector("input");
  const commentValue = commentInput.value;
  sendBoardComment(commentValue);
  commentInput.value = "";
};

function init() {
  addBoardComment.addEventListener("submit", handleBoardComment);
}

if (addBoardComment) {
  init();
}
