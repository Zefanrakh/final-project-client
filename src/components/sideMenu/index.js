import "./styles.scss";
import { useHistory, useLocation } from "react-router-dom";

const SideMenu = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const changePageHandler = (val) => {
    history.push(val);
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
            <i class="fas fa-home icon"></i>
            Dashboard
          </div>
          <div
            className={`menu-container ${
              pathname === "/customers" && "active"
            }`}
            onClick={() => changePageHandler("/customers")}
          >
            <i class="fas fa-user-friends icon"></i>
            Customers
          </div>
          <div
            className={`menu-container ${
              pathname === "/present-list" && "active"
            }`}
            onClick={() => changePageHandler("/present-list")}
          >
            <i class="fas fa-stream icon"></i>
            Present List
          </div>
        </>
      )}
      {role === "customer" && (
        <div
          className={`menu-container ${pathname === "/history" && "active"}`}
          onClick={() => changePageHandler("/history")}
        >
          <i class="fas fa-history icon"></i>
          History
        </div>
      )}
      <div
        className={`menu-container ${pathname === "/appointment" && "active"}`}
        onClick={() => changePageHandler("/appointment")}
      >
        <i class="fas fa-book-open icon"></i>
        Appointment
      </div>

      <div className="menu-container logout-container">
        <i class="fas fa-sign-out icon"></i>
        Logout
      </div>
    </div>
  );
};

export default SideMenu;
