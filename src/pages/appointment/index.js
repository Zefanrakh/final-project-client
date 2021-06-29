import "./styles.scss";
import { useState, useEffect } from "react";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import AddAppointmentForm from "../../components/addAppointmentForm";
import FloatingButton from "../../components/floatingButton";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import Payment from "../../components/payment";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../../store/action";

const listHeader = [
  "Id",
  "Child Name",
  "Child Age",
  "Start Date",
  "End Date",
  "Notes",
  "Status",
];

const dummyData = [
  {
    id: "1",
    childName: "barack",
    childAge: 9,
    startDate: "29/2/2021",
    endDate: "31/2/2021",
    notes: "notes panjang banget sampe gabisa diliat",
    status: "belum bayar",
    type: "infant",
  },
  {
    id: "2",
    childName: "kevin",
    childAge: 10,
    startDate: "29/2/2021",
    endDate: "31/2/2021",
    notes: "notes panjang banget sampe gabisa diliat",
    status: "sudah bayar",
    type: "infant",
  },
];

const Appointment = () => {
  const { search } = useLocation();
  const [isPayment, setIsPayment] = useState(false);
  const history = useHistory();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };
  const result = useSelector(
    ({ searchResultReducer }) => searchResultReducer.result
  );

  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.fetchAppointmentReducer.appointments
  );
  useEffect(() => {
    if (search) {
      const parsed = queryString.parse(search);
      if (parsed.payment) {
        setIsPayment(true);
      }
    } else {
      setIsPayment(false);
    }
  }, [search]);

  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }
    setIsloading(true);
    dispatch(fetchAppointment());
    setIsloading(false);
  }, []);

  if (isloading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="appointment-container">
      <SideMenu />
      <div className="main-container">
        {openPopUp && (
          <AddAppointmentForm
            openPopUpHandler={openPopUpHandler}
            dummyData={dummyData}
          />
        )}
        <Header />
        {isPayment ? (
          <Payment query={queryString.parse(search)} />
        ) : (
          <>
            <MainBoard
              isAppointment={true}
              listHeader={listHeader}
              dummyData={result.length === 0 ? dummyData : result}
            />
            <FloatingButton onClick={openPopUpHandler}>
              <i class="fas fa-plus"></i>
            </FloatingButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Appointment;
