import React from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function deleteItem() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-dark sticky-top">
        <button
          type="button"
          class="navbar-toggler bg-light"
          data-toggle="collapse"
          data-target="#nav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="nav">
          <a class="navbar-brand text-light px-3" href="/">
            <HotelIcon sx={{ fontSize: 20, color: "white" }} /> Horizon Hotels
          </a>

          <ul class="navbar-nav">
            {user ? (
              <>
                <li class="nav-item">
                  <a class="nav-link text-light font-weight-bold px-3">
                    <PersonIcon sx={{ fontSize: 15, color: "white" }} />{" "}
                    {user.name}
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/home">
                    Home
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/profile">
                    Profile
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={deleteItem}>
                    Log out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link px-3" href="/register">
                    Register
                    <HowToRegIcon sx={{ fontSize: 15, color: "white" }} />
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link px-3" href="/login">
                    Login
                    <LoginIcon sx={{ fontSize: 15, color: "white" }} />
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
