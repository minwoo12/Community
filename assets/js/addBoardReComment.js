import axios from "axios";

const addBoardReComment = document.querySelectorAll(".jsAddBoardReComment");

const sendBoardReComment = async (reText, commentId) => {
  const boardId = window.location.href;
  const response = await axios({
    url: boardId,
    method: "GET",
    params: {
      reText,
      commentId
    }
  });
  console.log(response);
  if (response.status === 200) {
    window.location.reload();
  }
};

const handleBoardReComment = index => {
  event.preventDefault();
  const commentInput = addBoardReComment[index].querySelector(
    ".jsReComment__text"
  );
  const commentIdInput = addBoardReComment[index].querySelector(".jsCommentId");
  const commentInputValue = commentInput.value;
  const commentIdValue = commentIdInput.value;
  sendBoardReComment(commentInputValue, commentIdValue);
  commentInput.value = "";
};

function init() {
  for (let i = 0; i < addBoardReComment.length; i++) {
    addBoardReComment[i].addEventListener("submit", index);
    function index() {
      addBoardReComment[i].index = i;
      const index = this.index;
      handleBoardReComment(index);
    }
  }
}

if (addBoardReComment) {
  init();
}
