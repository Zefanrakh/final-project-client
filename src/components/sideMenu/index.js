import "./styles.scss";
import { useHistory, useLocation } from "react-router-dom";

const SideMenu = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const changePageHandler = (val) => {
    history.push(val);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    history.push("/login");
  };

  const role = localStorage.getItem("role");
  return (
    <div className="side-menu">
      <div className="logo">logo here</div>

      {role === "admin" && (
        <>
          <div
            className={`menu-container ${pathname === "/" && "active"}`}
            onClick={() => changePageHandler("/")}
          >
            <i className="fas fa-home icon"></i>
            Dashboard
          </div>
          <div
            className={`menu-container ${
              pathname === "/customers" && "active"
            }`}
            onClick={() => changePageHandler("/customers")}
          >
            <i className="fas fa-user-friends icon"></i>
            Customers
          </div>
          <div
            className={`menu-container ${
              pathname === "/present-list" && "active"
            }`}
            onClick={() => changePageHandler("/present-list")}
          >
            <i className="fas fa-stream icon"></i>
            Present List
          </div>
        </>
      )}
      {role === "customer" && (
        <div
          className={`menu-container ${pathname === "/history" && "active"}`}
          onClick={() => changePageHandler("/history")}
        >
          <i className="fas fa-history icon"></i>
          History
        </div>
      )}
      <div
        className={`menu-container ${pathname === "/appointment" && "active"}`}
        onClick={() => changePageHandler("/appointment")}
      >
        <i className="fas fa-book-open icon"></i>
        Appointment
      </div>

      <div onClick={handleLogout} className="menu-container logout-container">
        <i className="fas fa-sign-out icon"></i>
        Logout
      </div>
    </div>
  );
};

export default SideMenu;
