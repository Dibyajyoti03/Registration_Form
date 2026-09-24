import { useState } from "react";
import axios from "axios";

function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const[error, setError] = useState ("");
    const[success, setSuccess] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if(!email || !password) {
            setError("Email and password are required");
            return;
        }
        try{
            const response = await axios.post(
                "https//localhost:5000/api/login",
                {
                    email,
                    password,
                }
            );
            console.log("Logic response:", response.data);

            setSuccess(response.data.message);
        }catch(error){
            console.log("Login error:", error);

            if(error.response){
                setError(error.response.data.message);
            }else {
                setError("Unable to connect to the server");
            }
        }
    }


return (
<div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="card shadow" style={{width:"400px"}}>
        <div className="card-body p-4">
            <div className="text-center mb-4">
                <h1 className="fw-bold">Login</h1>
                      <p className="text-muted">
                        Welcome back
                    </p>          
                </div>

                {success && (
                    <div className="alert alert-success">
                        {success}
                        </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                        </div>
                )}

                <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">
                        Email:
                    </label>

                    <input
                         type="email"
                         className="form-control"
                         placeholder="Enter Your Email"
                         value={email}
                         onChange={(e) =>{
                            setEmail(e.target.value);
                            setError("");
                            setSuccess("");
                         }}   
                    />
                </div>

                
                <div className="mb-3">
                   <label className="form-label">
                    Password:
                    </label> 

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) =>{
                            setPassword(e.target.value);
                            setError("");
                            setSuccess("");
                        }} 
                     />      
                </div>

                <div className="d-grid mt-4">
                    <button 
                       type="submit"
                       className="btn btn-priamry btn-lg" 
                    >
                        Login
                    </button>
                </div>

                </form>

            </div>

        </div>

    </div>
);
}

export default Login;