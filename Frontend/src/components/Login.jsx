import { useState } from "react";
import styles from "../styles/login.module.css";
import useLogin from "../hooks/useLogin";
import { useLocation } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showFailDialog, setShowFailDialog] = useState(false);
  const [errRes, setErrRes] = useState("");
  const location = useLocation();
  const { login } = useLogin();

  // Function to handle signup fail
  const handleLoginFail = (response) => {
    setErrRes(response); // Set the error message
    setShowFailDialog(true); // Show the dialog box
    setTimeout(() => setShowFailDialog(false), 3000); // Hide after 6 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ userName, password });
      if (response.status === 409) {
        handleLoginFail(response.response);
      } else {
        console.log("Login successful");
      }
    } catch (e) {
      // Handle other errors here
      handleLoginFail("An error occurred during login");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
      {/* Dialog Box */}
      {showFailDialog && (
        <div className={styles.failDialogBox}>
          <p>{errRes}</p>
        </div>
      )}
    </div>
  );
}
