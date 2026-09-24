
import { useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // First Name
  if (firstName === "") {
    newErrors.firstName = "Please Enter Your First Name";
  }

  // Last Name
  if (lastName === "") {
    newErrors.lastName = "Please Enter Your Last Name";
  }

  // Email
  if (email === "") {
    newErrors.email = "Please Enter Your Email";
  } else if (!emailPattern.test(email)) {
    newErrors.email = "Please Enter A Valid Email";
  }

  // Password
  if (password === "") {
    newErrors.password = "Please Enter Your Password";
  } else if (password.length < 8) {
    newErrors.password =
      "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(password)) {
    newErrors.password =
      "Password must contain an uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    newErrors.password =
      "Password must contain a lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    newErrors.password =
      "Password must contain a number";
  }

  // Confirm Password
  if (password !== "" && password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  // Gender
  if (gender === "") {
    newErrors.gender = "Please select your gender";
  }

  // Terms & Conditions
  if (!agree) {
    newErrors.agree =
      "You must agree to the Terms & Conditions";
  }

  setErrors(newErrors);

  // Stop if frontend validation fails
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  // Data sent to backend
  const userData = {
    firstName,
    lastName,
    email,
    password,
    gender,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/api/register",
      userData
    );

    console.log("Backend response:", response.data);

    // Show success message
    setSuccess(response.data.message);

    // Clear errors
    setErrors({});

    // Reset form only after successful registration
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setGender("");
    setAgree(false);

    setShowPassword(false);
    setShowConfirmPassword(false);

  } catch (error) {
    console.error("Registration error:", error);

    if (error.response) {
      setErrors({
        server: error.response.data.message,
      });
    } else {
      setErrors({
        server: "Unable to connect to the server",
      });
    }
  }
};
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow mx-auto registration-card">
        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            {/* Heading */}
            <div className="text-center mb-4">
              <h1 className="fw-bold">
                Create Account
              </h1>

              <p className="text-muted">
                Join us and create your account
              </p>

              {/* Success Message */}
              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}
            </div>

            {/* First Name + Last Name */}
            <div className="row">

              {/* First Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  First Name:
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);

                    setErrors({
                      ...errors,
                      firstName: "",
                    });

                    setSuccess("");
                  }}
                />

                {errors.firstName && (
                  <p className="text-danger mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Last Name:
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);

                    setErrors({
                      ...errors,
                      lastName: "",
                    });

                    setSuccess("");
                  }}
                />

                {errors.lastName && (
                  <p className="text-danger mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>

            </div>

            {/* Email */}
            <div className="mt-3 mb-3">
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

                  setErrors({
                    ...errors,
                    email: "",
                  });

                  setSuccess("");
                }}
              />

              {errors.email && (
                <p className="text-danger mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-3 mb-3">
              <label className="form-label">
                Password:
              </label>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors({
                    ...errors,
                    password: "",
                  });

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

              {errors.password && (
                <p className="text-danger mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mt-3 mb-3">
              <label className="form-label">
                Confirm Password:
              </label>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);

                  setErrors({
                    ...errors,
                    confirmPassword: "",
                  });

                  setSuccess("");
                }}
              />

              <button
                type="button"
                className="btn btn-outline-secondary mt-2"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide Password"
                  : "Show Password"}
              </button>

              {errors.confirmPassword && (
                <p className="text-danger mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-3">

              <label className="form-label d-block">
                Gender:
              </label>

              <div className="d-flex gap-4">

                {/* Male */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => {
                      setGender(e.target.value);

                      setErrors({
                        ...errors,
                        gender: "",
                      });

                      setSuccess("");
                    }}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="male"
                  >
                    Male
                  </label>
                </div>

                {/* Female */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => {
                      setGender(e.target.value);

                      setErrors({
                        ...errors,
                        gender: "",
                      });

                      setSuccess("");
                    }}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="female"
                  >
                    Female
                  </label>
                </div>

                {/* Other */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="other"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={(e) => {
                      setGender(e.target.value);

                      setErrors({
                        ...errors,
                        gender: "",
                      });

                      setSuccess("");
                    }}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="other"
                  >
                    Other
                  </label>
                </div>

              </div>

              {errors.gender && (
                <p className="text-danger mt-1">
                  {errors.gender}
                </p>
              )}

              <p className="mt-2">
                Selected Gender: {gender}
              </p>

            </div>

            {/* Terms & Conditions */}
            <div className="form-check">

              <input
                className="form-check-input"
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);

                  setErrors({
                    ...errors,
                    agree: "",
                  });

                  setSuccess("");
                }}
              />

              <label className="form-check-label">
                I agree to the Terms & Conditions
              </label>

              {errors.agree && (
                <p className="text-danger mt-1">
                  {errors.agree}
                </p>
              )}

              <p>
                Agreed: {agree ? "Yes" : "No"}
              </p>

            </div>

            {/* Submit Button */}
            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
              >
                Create Account
              </button>
            </div>

            {/* Login */}
            <p className="mt-3">
              Already have an account?{" "}
              <a href="#">
                Login
              </a>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;

