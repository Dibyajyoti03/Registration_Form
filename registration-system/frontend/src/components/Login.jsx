import { useState } from "react";
import axios from "axios";

function Login({ onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      setSuccess(response.data.message);

      console.log("JWT Token:", response.data.token);
      console.log("Logged in user:", response.data.user);

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          "Login failed"
        );
      } else {
        setError(
          "Unable to connect to the server"
        );
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <div
        className="card shadow"
        style={{ width: "400px" }}
      >

        <div className="card-body p-4">

          {/* Heading */}
          <div className="text-center mb-4">

            <h1 className="fw-bold">
              Login
            </h1>

            <p className="text-muted">
              Welcome back
            </p>

          </div>

          {/* Success Message */}
          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-3">

              <label className="form-label">
                Email:
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />

            </div>

            {/* Password */}
            <div className="mb-3">

              <label className="form-label">
                Password:
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />

              <button
                type="button"
                className="btn btn-outline-secondary mt-2"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? "Hide Password"
                  : "Show Password"}
              </button>

            </div>

            {/* Login Button */}
            <div className="d-grid mt-4">

              <button
                type="submit"
                className="btn btn-primary btn-lg"
              >
                Login
              </button>

            </div>

            {/* Register */}
            <p className="mt-3 text-center">

              Don't have an account?{" "}

              <button
                type="button"
                className="btn btn-link p-0"
                onClick={onRegisterClick}
              >
                Create Account
              </button>

            </p>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Login;