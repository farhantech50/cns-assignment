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
      if (res.data.error || res == undefined) {
        return { success: false, message: "Internal Server Error" };
      } else {
        return { success: true, message: res.data };
      }
    } catch (error) {
      if (error) {
        return { success: false, response: "Internal Server Error" };
      }
    }
  };

  return { project };
};

export default createProject;
