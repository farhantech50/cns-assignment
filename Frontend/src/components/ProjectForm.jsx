import React, { useState, useEffect } from "react";
import styles from "../styles/projectForm.module.css"; // Ensure CSS file exists
import { useAuthContext } from "../contexts/authContext";
import { useTableUpdateContext } from "../contexts/tableUpdateContext";
import useApi from "../hooks/useApi";
import useCreateProject from "../hooks/useCreateProject";

const CreateProjectForm = ({ currentUser, projectData }) => {
  const api = useApi();
  const { authUser } = useAuthContext();
  const { setTableUpdate } = useTableUpdateContext();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailDialog, setShowFailDialog] = useState(false);
  const { project, editProject } = useCreateProject();
  const [signupError, setSignupError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    owner: authUser.name,
    status: "",
    startDateTime: "",
    endDateTime: "",
    projectMembers: [],
  });
  const [formTitle, setFormTitle] = useState({
    title: "Create New Project",
    buttonText: "Submit",
  });

  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (projectData) {
      setFormTitle((prev) => ({
        ...prev,
        title: "Edit Project",
        buttonText: "Save",
      }));
      setFormData((prev) => ({
        ...prev,
        name: projectData.name,
        intro: projectData.intro,
        owner: projectData.owner,
        status: projectData.status,
        startDateTime: String(projectData.startDateTime).slice(0, 10),
        endDateTime: String(projectData.endDateTime).slice(0, 10),
      }));
    }
  }, [projectData]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/api/auth/getAllUsers");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const changeStartDate = async () => {
      if (formData.status == "pre") {
        formData.startDateTime = null;
      }
    };
    changeStartDate();
  }, [formData.status]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Function to handle signup success
  const handleSignupSuccess = () => {
    setShowSuccessDialog(true); // Show the dialog box
    setTimeout(() => setShowSuccessDialog(false), 3000);
  };

  // Function to handle signup fail
  const handleSignupFail = () => {
    setShowFailDialog(true); // Show the dialog box
    setTimeout(() => setShowFailDialog(false), 3000);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const newMembers = checked
        ? [...prevState.projectMembers, value] // Add member to array if checked
        : prevState.projectMembers.filter((id) => id !== value); // Remove member from array if unchecked
      return {
        ...prevState,
        projectMembers: newMembers,
      };
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (projectData) {
      try {
        const response = await editProject(
          projectData.id,
          formData.name,
          formData.intro,
          authUser.userId,
          formData.status,
          formData.startDateTime,
          formData.endDateTime,
          formData.projectMembers
        );
        if (response.success) {
          setTableUpdate((prev) => !prev); // Toggle between true and false
          handleSignupSuccess();
        } else {
          setSignupError(response.message);
          handleSignupFail();
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.log(error);
        } else {
          console.error("Unexpected error:", error.message || error);
        }
      }
    } else {
      if (formData.status === "pre" && formData.startDateTime) {
        setError("Start date must be empty for 'Pre' status.");
        return;
      }

      if (
        formData.endDateTime &&
        formData.startDateTime > formData.endDateTime
      ) {
        setError("End date cannot be before start date.");
        return;
      }
      try {
        const response = await project(
          formData.name,
          formData.intro,
          authUser.userId,
          formData.status,
          formData.startDateTime,
          formData.endDateTime,
          formData.projectMembers
        );

        if (response.success) {
          handleSignupSuccess();
        } else {
          setSignupError(response.message);
          handleSignupFail();
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.log(error);
        } else {
          console.error("Unexpected error:", error.message || error);
        }
        handleSignupFail();
      }
    }
  };

  return (
    <div className={styles.projectFormContainer}>
      <h2>{formTitle.title}</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className={styles.formGroup}>
          <label>Project Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Project Introduction */}
        <div className={styles.formGroup}>
          <label>Project Introduction:</label>
          <textarea
            name="intro"
            value={formData.intro}
            onChange={handleChange}
            required
          />
        </div>

        {/* Project Owner (Non-editable text box) */}
        <div className={styles.formGroup}>
          <label>Project Owner:</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            readOnly
            className={styles.disabledInput}
          />
        </div>

        {/* Project Status (Radio Buttons) */}
        <div className={styles.formGroup}>
          <label>Project Status:</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="status"
                value="pre"
                checked={formData.status === "pre"}
                onChange={handleChange}
              />
              Pre
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="start"
                checked={formData.status === "start"}
                onChange={handleChange}
              />
              Start
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="end"
                checked={formData.status === "end"}
                onChange={handleChange}
              />
              End
            </label>
          </div>
        </div>

        {/* Start Date (Only if status is not 'Pre') */}
        {formData.status !== "pre" && (
          <div className={styles.formGroup}>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
            />
          </div>
        )}

        {/* End Date */}
        <div className={styles.formGroup}>
          <label>End Date:</label>
          <input
            type="date"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
          />
        </div>

        {/* Project Members (Dropdown from API) */}
        <div className={styles.formGroup}>
          <label>Project Members:</label>
          <div
            style={{
              maxHeight: "200px",
              overflowY: "scroll",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {members.map((member) => {
              return (
                <div key={Math.random()}>
                  <label required>
                    <input
                      type="checkbox"
                      value={member.id}
                      checked={formData.projectMembers.includes(
                        String(member.id)
                      )}
                      onChange={handleCheckboxChange}
                      style={{ marginRight: "10px" }}
                    />
                    {`Name: ${member.name} - Username: ${member.username}`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          {formTitle.buttonText}
        </button>
      </form>
      {/* Dialog Box */}
      {showSuccessDialog && (
        <div className={styles.dialogBox}>
          <p>You have successfully created the project.</p>
        </div>
      )}
      {/* Dialog Box */}
      {showFailDialog && (
        <div className={styles.failDialogBox}>
          <p>{signupError}</p>
        </div>
      )}
    </div>
  );
};

export default CreateProjectForm;
