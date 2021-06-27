import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import AddPresenceForm from "../../components/addPresenceForm";
import { useState, useEffect } from "react";
import { fetchPresence } from "../../store/action"
import { useDispatch, useSelector} from "react-redux"

const listHeader = ["Id", "Dropper", "Pickuper", "Time", "Date"];

const PresenceList = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.fetchPresenceReducer.presenceList)
  const [openPopUp, setOpenPopUp] = useState(false);
  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };
  useEffect(() => {
    dispatch(fetchPresence())
  },[])
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
