import "./styles.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div className="search-container">
        <input placeholder="search...." />
        <i class="fas fa-search search-icon"></i>
      </div>
      <div className="profile-container">
        <img
          alt="profile"
          src="https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png"
        />
        Kevin Parimbu
      </div>
    </div>
  );
};

export default Header;
