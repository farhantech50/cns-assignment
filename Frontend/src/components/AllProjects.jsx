import React, { useState, useEffect } from "react";
import ProjectTable from "./AllProjectTable";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";

function AllProjects() {
  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("view"); // "view" or "edit"

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
  const handleDownloadPDF = async () => {
    const response = await fetch(
      "http://localhost:3000/project/generatePdf/all"
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
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
    <div
      style={{
        position: "relative",
        padding: "20px",
        border: "1px solid #ddd",
      }}
    >
      <h2>All Projects List</h2>

      <button
        onClick={handleDownloadPDF}
        style={{
          position: "absolute",
          top: "50px",
          right: "20px",
          background: "#09bd27",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate Report
      </button>

      <ProjectTable projects={projects} onView={handleView} />
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        mode={mode}
      />
    </div>
  );
}

export default AllProjects;
