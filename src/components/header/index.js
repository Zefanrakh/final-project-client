import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSearchResult } from "../../store/action";
import "./styles.scss";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event) => {
    let value = event.target.value;
    setKeyword(value);
  };
  let searchType = history.location.pathname.slice(1);
  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (history.location.pathname === "/") searchType = "appointment";
      let isEmpty = !keyword ? true : false;
      dispatch(fetchSearchResult(searchType, keyword, isEmpty));
    }, 800);
    return () => {
      clearTimeout(timeOut);
    };
  }, [keyword]);

  if (!user) {
    return <></>;
  }
  return (
    <div className="header-container">
      <div className="search-container">
        <input
          placeholder="search...."
          value={keyword}
          onChange={handleKeywordChange}
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      <div className="profile-container">
        <img
          alt="profile"
          src={user.profilePicture}
        />
        {user.username}
      </div>
    </div>
  );
};

export default Header;
