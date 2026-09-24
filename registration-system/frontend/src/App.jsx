import { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? (
        <Login
          onRegisterClick={() => setShowLogin(false)}
        />
      ) : (
        <RegistrationForm
          onLoginClick={() => setShowLogin(true)}
        />
      )}
    </>
  );
}

export default App;