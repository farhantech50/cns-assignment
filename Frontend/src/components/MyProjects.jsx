import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import ProjectTable from "./MyProjectTable";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";
import styles from "../styles/projectForm.module.css";

function MyProjects() {
  const api = useApi();
  const { authUser } = useAuthContext();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailDialog, setShowFailDialog] = useState(false);

  // Function to handle signup success
  const handleDeleteSuccess = () => {
    setShowSuccessDialog(true); // Show the dialog box
    setTimeout(() => setShowSuccessDialog(false), 3000);
  };

  // Function to handle signup fail
  const handleDeleteFail = () => {
    setShowFailDialog(true); // Show the dialog box
    setTimeout(() => setShowFailDialog(false), 3000);
  };

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

  const handleDelete = async (id) => {
    try {
      const response = await api.get(`/project/deleteProject/${id}`);
      console.log(response);
      if (response.status == 200) {
        setProjects(projects.filter((project) => project.id !== id));
        handleDeleteSuccess();
      }
    } catch (error) {
      handleDeleteFail();
      console.error(error.response.data.message);
    }
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
      <h2>My Projects List</h2>
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
      {/* Dialog Box */}
      {showSuccessDialog && (
        <div className={styles.dialogBox}>
          <p>Project deleted successfully</p>
        </div>
      )}
      {/* Dialog Box */}
      {showFailDialog && (
        <div className={styles.failDialogBox}>
          <p>Error deleting project</p>
        </div>
      )}
    </div>
  );
}

export default MyProjects;
