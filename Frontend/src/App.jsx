import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { useAuthContext } from "./contexts/authContext";
import Dashboard from "./components/Dashboard";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={authUser ? <Dashboard /> : <Login />} />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/dashboard" element={authUser ? <Dashboard /> : <Login />} />
    </Routes>
  );
}

export default App;
