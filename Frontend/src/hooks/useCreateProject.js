import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import useApi from "./useApi";

const createProject = () => {
  const api = useApi();
  const { authUser } = useAuthContext();

  const project = async (
    name,
    intro,
    ownerId,
    status,
    startDateTime,
    endDateTime,
    projectMembers
  ) => {
    try {
      const res = await api.post(`/project/newProject`, {
        name,
        intro,
        ownerId,
        status,
        startDateTime,
        endDateTime,
        projectMembers,
      });
      return { success: true, message: res.data };
    } catch (error) {
      if (error.response.status == 500) {
        // The request was made and the server responded with an error
        return {
          success: false,
          message: error.response.data.message || "Server Error",
        };
      } else if (error.request) {
        // The request was made but no response was received
        return { success: false, message: "No response from server" };
      } else {
        // Something else happened
        return { success: false, message: "Unexpected Error" };
      }
    }
  };

  const editProject = async (
    id,
    name,
    intro,
    ownerId,
    status,
    startDateTime,
    endDateTime,
    projectMembers
  ) => {
    try {
      const res = await api.post(`/project/editProject/${id}`, {
        name,
        intro,
        ownerId,
        status,
        startDateTime,
        endDateTime,
        projectMembers,
      });
      return { success: true, message: res.data };
    } catch (error) {
      if (error.response.status == 500) {
        // The request was made and the server responded with an error
        return {
          success: false,
          message: error.response.data.message || "Server Error",
        };
      } else if (error.request) {
        // The request was made but no response was received
        return { success: false, message: "No response from server" };
      } else {
        // Something else happened
        return { success: false, message: "Unexpected Error" };
      }
    }
  };

  return { editProject, project };
};

export default createProject;
