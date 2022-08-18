import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  function register() {
    if (password === confirmPassword) {
      const user = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }
      setLoading(true)
      axios.post("http://localhost:5000/api/users/register", user)
        .then((res) => {
          setLoading(false)
          console.log(res.data);
          setSuccess(true)

          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
          setError(true)
        })
    } else {
      alert("Passwords do not match");
    }
    
  }

  return (
    <div>
    {loading && (<Loading />)}
    {error && (<Error />)}
    
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bxs2">
        {success && (<Success message="Successfully Registered!" />)}
          <h2>Register</h2>
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="email"
            className="form-control mb-1"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            className="form-control mb-1"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input
            type="password"
            className="form-control mb-1"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button className="btn btn-md mt-2" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
