import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setLoggedInUser(null); 
  };

  return (
    <div className="h-screen w-screen">
      {loggedInUser ? (
        <Dashboard user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={setLoggedInUser} />
      )}
    </div>
  );
}
