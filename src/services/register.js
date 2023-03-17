import { CORS_URL } from "@env";
import axios from "axios";

export const postInfEmail = async (email) => {
  const response = await axios.post(`${CORS_URL}/register/checkEmail`, {
    email,
  });
  return response.data;
};
