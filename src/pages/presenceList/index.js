import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import AddPresenceForm from "../../components/addPresenceForm";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };
  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }
  }, []);
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
          dummyData={dummyData}
          isPresenceListPage
        />
        <FloatingButton onClick={openPopUpHandler}>
          <i class="fas fa-plus"></i>
        </FloatingButton>
      </div>
    </div>
  );
};

export default PresenceList;
