import { useSelector } from "react-redux";
import "./styles.scss";

const Header = () => {
  const user = useSelector((state) => state.userReducer.user);

  if (!user) {
    return <></>;
  }
  return (
    <div className="header-container">
      <div className="search-container">
        <input placeholder="search...." />
        <i className="fas fa-search search-icon"></i>
      </div>
      <div className="profile-container">
        <img
          alt="profile"
          src={user.profilePicture}
          // src="https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png"
        />
        {user.username}
      </div>
    </div>
  );
};

export default Header;
