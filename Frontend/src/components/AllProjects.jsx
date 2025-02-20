import React, { useState, useEffect } from "react";
import ProjectTable from "./AllProjectTable";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";

function AllProjects() {
  const api = useApi();
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

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const response = await api.get(`/project/allProject`);
        setProjects(response.data.message);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMyProjects();
  }, []);

  return (
    <div>
      <ProjectTable projects={projects} onView={handleView} />
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
      ;
    </div>
  );
}

export default AllProjects;
