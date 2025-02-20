import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const MuiModalExample = ({ open, onClose, project }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Project Details</DialogTitle>
      <DialogContent>
        {project ? (
          <>
            <p>
              <strong>Name:</strong> {project.name}
            </p>
            <p>
              <strong>Details:</strong> {project.intro}
            </p>
            <p>
              <strong>Members:</strong>
              {project.projectMembers.map((name, index) => (
                <p key={index}>
                  {name}
                  <br />
                </p>
              ))}
            </p>
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
