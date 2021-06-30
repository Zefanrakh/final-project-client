import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import AddPresenceForm from "../../components/addPresenceForm";
import { useState, useEffect } from "react";
import { fetchPresence } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardBanner from "../../components/cardBanner";

const listHeader = ["Id", "Child Name", "Dropper", "Pickupper", "Time", "Date"];

const PresenceList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.fetchPresenceReducer.presenceList);
  const [openPopUp, setOpenPopUp] = useState(false);
  const user = useSelector(({ userReducer }) => userReducer.user);
  const result = useSelector(
    ({ searchResultReducer }) => searchResultReducer.result
  );

  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };
  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }

    if (user && user.role === "customer") {
      history.push("/appointment");
    }

    dispatch(fetchPresence());
  }, [user]);

  return (
    <div className="presenceList-container">
      <SideMenu />
      <div className="main-container">
        {openPopUp && (
          <AddPresenceForm openPopUpHandler={openPopUpHandler} data={data} />
        )}
        <Header />
        <div className="banner-container">
          <div className="info-container">
            <CardBanner
              title="Present List"
              subTitle="present and get QR code!"
              image="https://www.tap2assist.me/images/Samsung-Hand.png"
            />
            <div className="info-total">
              {result.length === 0 ? data.length : result.length}
              <div className="text">Present List</div>
            </div>
          </div>
        </div>

        <MainBoard
          listHeader={listHeader}
          data={result.length === 0 ? data : result}
          isPresenceListPage
        />
        <FloatingButton onClick={openPopUpHandler}>
          <i className="fas fa-plus"></i>
        </FloatingButton>
      </div>
    </div>
  );
};

export default PresenceList;
