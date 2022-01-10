let modalOver = document.querySelector(".modal-over");
let modalRec = document.querySelector(".modal-record");
let linkRecord = document.querySelector(".records");
let modals = document.querySelectorAll("modal");

linkRecord.addEventListener("click", (e) => {
  modalRec.classList.add("modal-visible");
  modalOver.classList.add("modal-overlay-visible");
});

modalOver.addEventListener("click", (e) => {
  //console.log(e.target);
  if (e.target === modalOver) {
      modalRec.classList.remove("modal-visible");
      modalOver.classList.remove("modal-overlay-visible");
  };
});
