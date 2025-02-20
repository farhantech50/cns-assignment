import { use, useState } from "react";
import styles from "../styles/dashboard.module.css"; // Importing the CSS Module
import useLogout from "../hooks/useLogout";
import Signup from "./Signup";
import Projects from "./Projects";
import { useAuthContext } from "../contexts/authContext";

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const [activePage, setActivePage] = useState("home"); // Default page is 'home'
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailDialog, setShowFailDialog] = useState(false);
  const [errRes, setErrRes] = useState("");

  // Individual handlers for each button
  const handleHomeClick = () => {
    setActivePage("home");
  };

  const handleProjectsClick = () => {
    setActivePage("projects");
  };

  const handleSignupClick = () => {
    setActivePage("signup");
  };

  const handleLogout = () => {
    logout();
  };

  // Function to handle signup success
  const handleSignupSuccess = () => {
    setShowSuccessDialog(true); // Show the dialog box
    setTimeout(() => setShowSuccessDialog(false), 3000);
  };

  // Function to handle signup fail
  const handleSignupFail = (response) => {
    //response here is receiving data from child to parent
    setErrRes(response);

    setShowFailDialog(true); // Show the dialog box
    setTimeout(() => setShowFailDialog(false), 3000);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <button
          className={`${styles.sidebarButton} ${
            activePage === "home" ? styles.sidebarButtonActive : ""
          }`}
          onClick={handleHomeClick}
        >
          Home
        </button>
        <button
          className={`${styles.sidebarButton} ${
            activePage === "projects" ? styles.sidebarButtonActive : ""
          }`}
          onClick={handleProjectsClick}
        >
          Projects
        </button>
        {authUser?.role === "admin" && (
          <button
            className={`${styles.sidebarButton} ${
              activePage === "signup" ? styles.sidebarButtonActive : ""
            }`}
            onClick={handleSignupClick}
          >
            Signup
          </button>
        )}
        <button
          className={styles.sidebarButton} // Logout button
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activePage === "home" && <h1>Welcome to the Dashboard</h1>}
        {activePage === "projects" && <Projects />}
        {activePage === "signup" && (
          <Signup
            onSignupSuccess={handleSignupSuccess}
            onSignupFail={handleSignupFail}
          />
        )}
      </div>
      {/* Dialog Box */}
      {showSuccessDialog && (
        <div className={styles.dialogBox}>
          <p>You have successfully signed up the user</p>
        </div>
      )}
      {/* Dialog Box */}
      {showFailDialog && (
        <div className={styles.failDialogBox}>
          <p>{errRes}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
