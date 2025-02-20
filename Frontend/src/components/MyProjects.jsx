import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import ProjectTable from "./ProjectTable";
import useApi from "../hooks/useApi";

function MyProjects() {
  const api = useApi();
  const { authUser } = useAuthContext();
  const [projects, setProjects] = useState([]);

  const handleEdit = (id) => {
    console.log(`Editing project with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const response = await api.get(
          `/project/projectById/${authUser.userId}`
        );
        console.log(response.data.message);
        setProjects(response.data.message);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMyProjects();
  }, []);

  return (
    <div>
      <h2>Project List</h2>
      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default MyProjects;
