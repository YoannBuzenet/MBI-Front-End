function save(sellBasket) {
  window.localStorage.setItem("userSellingBasket", JSON.stringify(sellBasket));
}

function getSaved() {
  const savedBasket = window.localStorage.getItem("userSellingBasket");

  return JSON.parse(savedBasket);
}

export default {
  save,
  getSaved
};
