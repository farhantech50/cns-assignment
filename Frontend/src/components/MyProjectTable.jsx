import React from "react";
import styles from "../styles/projectTable.module.css";

const ProjectTable = ({ projects, onEdit, onDelete, onView }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.projectTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.intro}</td>
              <td>{project.owner_id}</td>
              <td>{project.status}</td>
              <td>{String(project.startDateTime).slice(0, 10)}</td>
              <td>{String(project.endDateTime).slice(0, 10)}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => onView(project.id)}
                >
                  View
                </button>
                <button
                  className={styles.editBtn}
                  onClick={() => onEdit(project.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
