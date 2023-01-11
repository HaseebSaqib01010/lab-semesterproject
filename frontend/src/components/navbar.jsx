import React, { useEffect, useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Store";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // const mode = useSelector((state) => state.mode);
  const mode = localStorage.getItem("thememode");

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const username = localStorage.getItem("username");
  const location = useLocation();

  // const theme = themeSettings()

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const DropdownMenu = () => {
    return (
      <div className="dropdown-menu">
        {isLoggedIn && (
          <>
            <div className="profile-circle">
              <p>{username.charAt(0)}</p>
            </div>
            <h3>{username}</h3>
          </>
        )}
        <ul>
          <div className="dropdown-item">
            <EditOutlinedIcon className="dropdown-icon" />
            <li>Edit Profile</li>
          </div>
          <div className="dropdown-item">
            <NewspaperOutlinedIcon className="dropdown-icon" />
            <li>My Blogs</li>
          </div>
          {isLoggedIn ? (
            <div
              className="dropdown-item"
              // onClick={() => dispatch(authActions.logout())}
            >
              <LogoutIcon className="dropdown-icon" />
              <li>Logout</li>
            </div>
          ) : (
            <div
              className="dropdown-item"
              onClick={() => {
                // dispatch(authActions.updateRedirect(location.pathname));
                navigate("/auth");
              }}
            >
              <LoginIcon className="dropdown-icon" />
              <li>Login</li>
            </div>
          )}
        </ul>
      </div>
    );
  };
  console.log("mode = ", mode);
  // let navclassname = "navbar";
  return (
    <div className="navbar">
      <div className="logo">
        <h2 className={mode === "dark" ? "logo-dark" : ""}>Food Reviews </h2>
      </div>
      <nav>
        {menuOpen ? (
          <div className="menu">
            <CloseOutlinedIcon
              className={`icon ${mode === "dark" ? "icon-dark" : ""}`}
              onClick={handleMenu}
            />
          </div>
        ) : (
          <div className="menu">
            <MenuOutlinedIcon
              className={`icon ${mode === "dark" ? "icon-dark" : ""}`}
              onClick={handleMenu}
            />
          </div>
        )}
        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive
                ? "active"
                : `nav-link ${mode == "dark" ? "nav-links-dark" : ""}`;
            }}
          >
            Home
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/add-review"
                className={({ isActive }) => {
                  return isActive
                    ? "active"
                    : `nav-link ${mode == "dark" ? "nav-links-dark" : ""}`;
                }}
              >
                New Review
              </NavLink>
            </>
          )}
          <NavLink
            to="/contact"
            className={({ isActive }) => {
              return isActive
                ? "active"
                : `nav-link ${mode == "dark" ? "nav-links-dark" : ""}`;
            }}
          >
            Contact Us
          </NavLink>
        </div>
      </nav>

      {isLoggedIn ? (
        <button onClick={() => dispatch(actions.logout())}>Logout</button>
      ) : (
        <Link to={"/auth"}>Login</Link>
      )}

      {dropdownOpen && <DropdownMenu />}
    </div>
  );
}

export default Navbar;
