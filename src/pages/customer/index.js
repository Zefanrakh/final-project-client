import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import FloatingButton from "../../components/floatingButton";
import { useState, useEffect } from "react";
import AddMemberForm from "../../components/addMemberForm";
import { fetchCustomer } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardBanner from "../../components/cardBanner";

const listHeader = ["Id", "Name", "Address", "Email", "Phone Number"];
const Customer = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchCustomerReducer.customers);
  const history = useHistory();
  const [openPopUp, setOpenPopUp] = useState(false);
  const user = useSelector(({ userReducer }) => userReducer.user);
  const result = useSelector(
    ({ searchResultReducer }) => searchResultReducer.result
  );
  const [isLoading, setIsLoading] = useState(true);
  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };

  const fetchCustomerHandler = async () => {
    await dispatch(fetchCustomer());
    setIsLoading(false);
  };

  useEffect(async () => {
    if (!localStorage.access_token) {
      history.push("/login");
    }

    if (user && user.role === "customer") {
      history.push("/appointment");
    }

    fetchCustomerHandler();
  }, [user]);

  return (
    <div className="costumer-container">
      {openPopUp && <AddMemberForm openPopUpHandler={openPopUpHandler} />}
      <SideMenu />
      <div className="main-container">
        <Header />
        <div className="info-container">
          <CardBanner
            title="List Customer Page"
            subTitle="add and delete customer here!"
          />
          <div className="info-total">
            {result.length === 0 ? data.length : result.length}
            <div className="text">Customers</div>
          </div>
        </div>

        <MainBoard
          listHeader={listHeader}
          data={result.length === 0 ? data : result}
          isMemberPage={true}
          isLoading={isLoading}
        />
        <FloatingButton onClick={openPopUpHandler}>
          <i class="fas fa-plus"></i>
        </FloatingButton>
      </div>
    </div>
  );
};

export default Customer;
