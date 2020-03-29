import { toast } from "react-toastify";

function check401(error) {
  if (error.response) {
    if (error.response.message === "") {
      toast.error("Vous n'êtes plus connecté. Merci de vous reconnecter");
    }
  }
}

export default {};
