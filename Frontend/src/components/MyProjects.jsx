import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import ProjectTable from "./MyProjectTable";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";
import styles from "../styles/projectForm.module.css";
import { useTableUpdateContext } from "../contexts/tableUpdateContext";

function MyProjects() {
  const api = useApi();
  const { authUser } = useAuthContext();
  const { tableUpdate, setTableUpdate } = useTableUpdateContext();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailDialog, setShowFailDialog] = useState(false);
  const [mode, setMode] = useState("view"); // "view" or "edit"

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
    setMode("view");
    setIsModalOpen(true); // Open Modal
  };

  const handleEdit = (id) => {
    const project = projects.find((proj) => proj.id === id);
    setSelectedProject(project);
    setMode("edit");
    setIsModalOpen(true); // Open Modal
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the deletion
    }
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
  }, [tableUpdate]);

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
        mode={mode}
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
