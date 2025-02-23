import React from "react";
import ReactDOM from "react-dom/client"; // note the '/client' import
import { BrowserRouter } from "react-router-dom"; // Ensure this is imported
import { AuthContextProvider } from "./contexts/authContext";
import { TableUpdateContextProvider } from "./contexts/tableUpdateContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TableUpdateContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TableUpdateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
