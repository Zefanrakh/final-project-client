import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import AddPresenceForm from "../../components/addPresenceForm";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const listHeader = ["Id", "Dropper", "Pickuper", "Time", "Date"];

const dummyData = [
  {
    id: "1",
    dropperName: "Jao",
    pickuperName: "Jerome",
    pickupTime: "09:22",
    presenceDate: "27/28/2001",
  },
];

const PresenceList = () => {
  const history = useHistory();
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
  }, [user]);

  return (
    <div className="presenceList-container">
      <SideMenu />
      <div className="main-container">
        {openPopUp && (
          <AddPresenceForm
            openPopUpHandler={openPopUpHandler}
            dummyData={dummyData}
          />
        )}
        <Header />
        <MainBoard
          listHeader={listHeader}
          dummyData={result.length === 0 ? dummyData : result}
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
