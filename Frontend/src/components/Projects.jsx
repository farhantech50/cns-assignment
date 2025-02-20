import React, { useState } from "react";
import styles from "../styles/projects.module.css";
import ProjectForm from "./ProjectForm";
import MyProjects from "./MyProjects";
import AllProjects from "./AllProjects";

const Projects = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.projectsContainer}>
      <h1>Projects</h1>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button onClick={() => handleTabClick("myProjects")}>
          My Projects
        </button>
        <button onClick={() => handleTabClick("allProjects")}>
          All Projects
        </button>
        <button onClick={() => handleTabClick("createProject")}>
          Create New Project
        </button>
      </div>

      {/* Render Content Based on Active Tab */}
      <div className={styles.content}>
        {activeTab === "myProjects" && <MyProjects />}
        {activeTab === "allProjects" && <AllProjects />}
        {activeTab === "createProject" && <ProjectForm />}
      </div>
    </div>
  );
};

export default Projects;
