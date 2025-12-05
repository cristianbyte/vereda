import Logo from "../icons/logo.jsx";
import LogOut from "../icons/logOut.jsx";
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
