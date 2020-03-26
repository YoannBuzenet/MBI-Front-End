import axios from "axios";

function updatePercentPer(shopID, object) {
  return axios.put("http://127.0.0.1:8000//usersShop/" + shopID, object);
}

export default { updatePercentPer };
