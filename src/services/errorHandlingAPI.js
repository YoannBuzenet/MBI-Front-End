import { toast } from "react-toastify";

function check401Unauthorized(error) {
  if (error.response) {
    console.log(error.response);
    if (error.response.statusText === "Unauthorized") {
      toast.error("Vous n'êtes plus connecté. Merci de vous reconnecter");
      return true;
    }
  }
}

export default { check401Unauthorized };
