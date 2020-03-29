import { toast } from "react-toastify";

function check401Unauthorized(error) {
  if (error.response) {
    if (error.response.message === "Unauthorized") {
      toast.error("Vous n'êtes plus connecté. Merci de vous reconnecter");
      return true;
    }
  }
}

export default { check401Unauthorized };
