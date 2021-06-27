import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import AddPresenceForm from "../../components/addPresenceForm";
import { useState } from "react";

const listHeader = ["Id", "Dropper", "Pickuper", "Time", "Date"];

const data = [
  {
    id: "1",
    dropperName: "Jao",
    pickuperName: "Jerome",
    pickupTime: "09:22",
    presenceDate: "27/28/2001",
  },
];

const PresenceList = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };
  return (
    <div className="presenceList-container">
      <SideMenu />
      <div className="main-container">
        {openPopUp && (
          <AddPresenceForm
            openPopUpHandler={openPopUpHandler}
            data={data}
          />
        )}
        <Header />
        <MainBoard
          listHeader={listHeader}
          data={data}
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
