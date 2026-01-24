function openNotif() {
  document.querySelector(".notif").style.display = "block";
}

function closeNotif() {
  document.querySelector(".notif").style.display = "none";
}


function showToast(product) {
  let toast = document.querySelector(".toast");
  toast.textContent = `Товар '${product}' був додан до кошика.`;
  toast.classList.add("show");
  
  let basketCountElem = document.querySelector(".basket_item");
  let currentCount = parseInt(basketCountElem.textContent);
  basketCountElem.textContent = currentCount + 1;
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

