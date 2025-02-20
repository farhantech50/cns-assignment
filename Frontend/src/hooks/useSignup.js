import { useNavigate } from "react-router-dom";
import useApi from "./useApi";

const useSignup = () => {
  const api = useApi();

  const signup = async (formData) => {
    const { name, contact, username, password, email, role } = formData;
    try {
      const response = await api.post(`/api/auth/signup`, {
        name,
        contact,
        username,
        password,
        email,
        role,
      });
      return { success: true, response: response.data };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error: Internal Server Error");
          return { success: false, response: error.response.data };
        } else if (error.response.status === 500) {
          console.log("Error: Internal Server Error");
          return { success: false, response: error.response.data };
        } else if (error.response.status === 409) {
          console.log("Error:  Username already exits!");
          return { success: false, response: "Username already exits!" };
        }
      } else {
        console.log("Network or other error", error);
        throw new Error("Something went wrong");
      }
    }
  };

  return { signup };
};

export default useSignup;
