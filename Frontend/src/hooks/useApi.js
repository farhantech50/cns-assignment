import axios from "axios";
import useLogout from "./useLogout";

const useApi = () => {
  const { logout } = useLogout(); // Call useLogout here
  const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  // Request Interceptor
  api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("access-token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequestUrl = error.config.url;

      if (error.response?.status === 405) {
        alert(
          "Unauthorized access! You do not have permission to perform this task."
        );
        window.history.back();
      }

      if (
        error.response?.status === 401 &&
        originalRequestUrl === "/newAccessToken"
      ) {
        logout();
        console.log("Goodbye", error.response);
      }

      if (
        error.response?.status === 403 &&
        originalRequestUrl !== "/newAccessToken"
      ) {
        try {
          const { data } = await api.post("/newAccessToken");
          const newAccessToken = data.accessToken;

          if (newAccessToken) {
            localStorage.setItem(
              "access-token",
              JSON.stringify(newAccessToken)
            );
            api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

            // Retry the failed request with the new token
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return api.request(error.config);
          }
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
  return api;
};

export default useApi;
