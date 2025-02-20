import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import useApi from "./useApi";

const useLogin = () => {
  const api = useApi();
  const { setAuthUser, setToken } = useAuthContext();
  const { authUser } = useAuthContext();
  const login = async ({ userName, password }) => {
    try {
      const res = await api.post(`/api/auth/login`, {
        userName,
        password,
      });
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }

      // localStorage
      localStorage.setItem("user-details", JSON.stringify(data));
      localStorage.setItem("access-token", JSON.stringify(data.accessToken));
      //setAccessToken(data.accessToken);
      setAuthUser(data);
      return data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          return { status: 409, response: "Invalid Username or Password" };
        } else if (error.response.status === 500) {
          console.log("Error: Internal Server Error");
          throw new Error("Internal Server Error");
        } else {
          console.log("Error: ", error.response.data.error);
          throw new Error(error.response.data.error); // Re-throw any other error
        }
      } else {
        console.log("Network or other error", error);
        throw new Error("Something went wrong");
      }
    }
  };

  return { login };
};

export default useLogin;
