import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import { useState, useEffect } from "react";
import AddMemberForm from "../../components/addMemberForm";
import { fetchCustomer } from "../../store/action"
import { useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom";

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
  const dispatch = useDispatch()
  const data = useSelector(state => state.fetchCustomerReducer.customers)
  const history = useHistory();
  const [openPopUp, setOpenPopUp] = useState(false);
  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };
  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }
    dispatch(fetchCustomer())
  },[])
  if(!data){
    return <p>Loading...</p>
  }

  return (
    <div className="costumer-container">
      {openPopUp && <AddMemberForm openPopUpHandler={openPopUpHandler} />}
      <SideMenu />
      <div className="main-container">
        <Header />
        <MainBoard
          listHeader={listHeader}
          data={data}
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
