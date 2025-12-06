import { useNavigate } from "react-router-dom";
import Logo from "../icons/logo.jsx";
import LogOut from "../icons/logOut.jsx";
import "../styles/header.css";
import "../styles/dashboardHeader.css";

export default function DashboardHeader({ user, onLogOut }) {
  const navigate = useNavigate();
  return (
    <div className="dashboardHeader">
      <div className="dashboardheader-container">
        <Logo />
        <nav>
          <div>{user}</div>
          <div
            className="logout-button"
            onClick={() => {
              onLogOut();
              navigate("/");
            }}
          >
            Cerrar <LogOut />
          </div>
        </nav>
      </div>
    </div>
  );
}
