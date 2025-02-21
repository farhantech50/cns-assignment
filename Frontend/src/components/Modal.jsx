import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ProjectForm from "./ProjectForm";

const MuiModalExample = ({ open, onClose, project, mode }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Project Details</DialogTitle>
      <DialogContent>
        {project ? (
          <>
            {mode === "view" ? (
              <>
                <p>
                  <strong>Name:</strong> {project.name}
                </p>
                <p>
                  <strong>Details:</strong> {project.intro}
                </p>
                <p>
                  <strong>Members:</strong>
                </p>
                <div>
                  {project.projectMembers.map((name, index) => (
                    <p key={index}>{name}</p>
                  ))}
                </div>
              </>
            ) : (
              <ProjectForm projectData={project} />
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MuiModalExample;
