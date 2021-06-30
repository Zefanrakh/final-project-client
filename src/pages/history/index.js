import "./styles.scss";
import { useState, useEffect } from "react";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentByCustomer } from "../../store/action";
import CardBanner from "../../components/cardBanner";

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
    startDate: "29 / 2 / 2021",
    endDate: "31 / 2 / 2021",
    notes: "notes panjang banget sampe gabisa diliat",
    status: "belum bayar",
  },
  {
    id: "2",
    childName: "kevin",
    childAge: 10,
    startDate: "29 / 2 / 2021",
    endDate: "31 / 2 / 2021",
    notes: "notes panjang banget sampe gabisa diliat",
    status: "sudah bayar",
  },
];

const History = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openPopUp, setOpenPopUp] = useState(false);
  const user = useSelector(({ userReducer }) => userReducer.user);
  const openPopUpHandler = () => {
    setOpenPopUp(!openPopUp);
  };

  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }
    if (user) {
      if (user.role === "admin") {
        history.push("/");
      }
      dispatch(fetchAppointmentByCustomer(user.CustomerId));
    }
  }, [user]);

  let appointments = useSelector(
    (state) => state.fetchAppointmentReducer.appointments
  );
  if (!appointments) {
    return <></>;
  }

  const data = appointments.filter((appointment) => {
    const endAppointment = new Date(appointment.endDate);
    const now = new Date();
    return endAppointment < now;
  });

  return (
    <div className="history-container">
      <SideMenu />
      <div className="main-container">
        <Header />
        <div className="info-container">
          <div className="banner-container">
            <CardBanner
              title="List History"
              subTitle="see your last appointment here!"
            />
          </div>
          <div className="info-total">
            {data.length}
            <div className="text">History</div>
          </div>
        </div>

        <MainBoard listHeader={listHeader} data={data} />
      </div>
    </div>
  );
};

export default History;
