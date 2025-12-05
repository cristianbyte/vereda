import Logo from "../assets/logo.jsx";
import LogOut from "../assets/logOut.jsx";
import "../styles/header.css";
import "../styles/dashboardHeader.css";

export default function DashboardHeader({ user }) {
  return (
    <div className="dashboardHeader">
      <div className="dashboardheader-container">
        <Logo />
        <nav>
          <div>{user.name}</div>
          <div>
            Cerrar <LogOut />
          </div>
        </nav>
      </div>
    </div>
  );
}
