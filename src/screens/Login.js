import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  
    function login() {
        const user = {
            email: email,
            password: password
        }

        setLoading(true)
        axios.post("http://localhost:5000/api/users/login", user)
            .then((res) => {
                setLoading(false)
                let result = res.data;
                localStorage.setItem("currentUser", JSON.stringify(result));
                window.location.href="/home"
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                setError(true)
            });
    }

  return (
    <div>
    {loading && (<Loading />)}
    
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bxs2">
          {error && (<Error message="Error! Invalid Credentials. Try Again."/>)}
          <h2>Login</h2>
          <input
            type="text"
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
            onChange={(e) => { setPassword(e.target.value)}}
          />
          <button type="submit" className="btn btn-md mt-2" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
