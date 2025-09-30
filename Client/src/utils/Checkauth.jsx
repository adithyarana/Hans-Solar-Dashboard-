import {jwtDecode} from "jwt-decode";

export const Checkauth = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
