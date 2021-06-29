import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import { useState, useEffect } from "react";
import AddMemberForm from "../../components/addMemberForm";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const listHeader = ["Id", "Name", "Address", "Email", "Phone Number"];
const dummyData = [
  {
    id: "1",
    name: "kevin",
    address: "bogor",
    email: "kevin@gmail.com",
    phone: "081121313131",
  },
  {
    id: "2",
    name: "Joni",
    address: "alor",
    email: "joni@gmail.com",
    phone: "424244242",
  },
];
const Customer = () => {
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
    <div className="costumer-container">
      {openPopUp && <AddMemberForm openPopUpHandler={openPopUpHandler} />}
      <SideMenu />
      <div className="main-container">
        <Header />
        <MainBoard
          listHeader={listHeader}
          dummyData={result.length === 0 ? dummyData : result}
          isMemberPage={true}
        />
        <FloatingButton onClick={openPopUpHandler}>
          <i class="fas fa-plus"></i>
        </FloatingButton>
      </div>
    </div>
  );
};

export default Customer;
