import React from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const history = useHistory();

  const NAVIGATE = (path) => {
    history.replace(path);
  };
  const getNavTitle = () => {
    if (location.pathname === "/admin/post") {
      return "Create New Post";
    }
    if (location.pathname === "/admin") {
      return "Manga";
    }
    if (location.pathname === "/") {
      return "Mangakun";
    } else {
      return (
        <span
          className="text-dark me-3 pointer"
          onClick={() => history.replace("/")}
        >
          <i className="fas fa-chevron-left me-2"></i>Back
        </span>
      );
    }
  };

  const getNavItems = () => {
    if (location.pathname === "/admin") {
      return (
        <>
          <span
            className="text-dark me-3 pointer"
            onClick={() => NAVIGATE("/admin/post")}
          >
            <i className="fas fa-plus-circle"></i>
          </span>
          <span
            className="text-dark me-3 pointer"
            onClick={() => {
              localStorage.removeItem("auth");
              history.replace("/login");
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
          </span>
        </>
      );
    }
    if (location.pathname === "/admin/post") {
      return (
        <>
          <span
            className="text-dark me-3 pointer"
            onClick={() => NAVIGATE("/admin")}
          >
            <i className="fas fa-list"></i>
          </span>
          <span
            className="text-dark me-3 pointer"
            onClick={() => {
              localStorage.removeItem("auth");
              history.replace("/login");
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
          </span>
        </>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <span
            className="nav-link ms-3 me-3 pointer text-dark"
            style={{ fontWeight: "700" }}
          >
            {getNavTitle()}
          </span>
        </li>
      </ul>
      <div className="d-flex align-items-center">{getNavItems()}</div>
    </nav>
  );
}
