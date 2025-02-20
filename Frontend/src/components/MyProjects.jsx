import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import ProjectTable from "./MyProjectTable";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";

function MyProjects() {
  const api = useApi();
  const { authUser } = useAuthContext();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleView = async (id) => {
    const project = projects.find((proj) => proj.id === id);
    const response = await api.get(`/project/projectMember/${id}`);
    const updatedProject = {
      ...project,
      projectMembers: response.data.message,
    };
    setSelectedProject(updatedProject);
    setIsModalOpen(true); // Open Modal
  };

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
        onView={handleView}
      />
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export default MyProjects;
