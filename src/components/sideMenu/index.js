import "./styles.scss";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const user = useSelector(({ userReducer }) => userReducer.user);

  const changePageHandler = (val) => {
    history.push(val);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    history.push("/login");
  };

  if (!user) {
    // return history.push('/login')
    return <></>;
  }

  // const role = user.role;
  return (
    <div className="side-menu">
      <div className="logo">D-CARE</div>

      {user && user.role === "customer" && (
        <div
          className={`menu-container ${pathname === "/dashboard" && "active"}`}
          onClick={() => changePageHandler("/dashboard")}
        >
          {pathname === "/dashboard" && (
            <div className="fluid-active">
              <i className="fas fa-home icon-active"></i>
            </div>
          )}
          <i className="fas fa-home icon"></i>
        </div>
      )}

      {user && user.role === "admin" && (
        <>
          <div
            className={`menu-container ${pathname === "/" && "active"}`}
            onClick={() => changePageHandler("/")}
          >
            {pathname === "/" && (
              <div className="fluid-active">
                <i className="fas fa-home icon-active"></i>
              </div>
            )}
            <i className="fas fa-home icon"></i>
          </div>
          <div
            className="menu-container"
            onClick={() => changePageHandler("/customers")}
          >
            {pathname === "/customers" && (
              <div className="fluid-active">
                <i className="fas fa-user-friends icon-active"></i>
              </div>
            )}
            <i className="fas fa-user-friends icon"></i>
          </div>
          <div
            className={`menu-container ${
              pathname === "/present-list" && "active"
            }`}
            onClick={() => changePageHandler("/present-list")}
          >
            {pathname === "/present-list" && (
              <div className="fluid-active">
                <i className="fas fa-stream icon-active"></i>
              </div>
            )}
            <i className="fas fa-stream icon"></i>
          </div>
        </>
      )}
      {user && user.role === "customer" && (
        <div
          className={`menu-container ${pathname === "/history" && "active"}`}
          onClick={() => changePageHandler("/history")}
        >
          {pathname === "/history" && (
            <div className="fluid-active">
              <i className="fas fa-history icon-active"></i>
            </div>
          )}
          <i className="fas fa-history icon"></i>
        </div>
      )}
      <div
        className="menu-container"
        onClick={() => changePageHandler("/appointment")}
      >
        {pathname === "/appointment" && (
          <div className="fluid-active">
            <i className="fas fa-book-open icon-active"></i>
          </div>
        )}

        <i className="fas fa-book-open icon"></i>
      </div>

      <div onClick={handleLogout} className="menu-container logout-container">
        <i className="fas fa-sign-out icon"></i>
      </div>
    </div>
  );
};

export default SideMenu;
