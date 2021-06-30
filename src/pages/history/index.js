import "./styles.scss";
import { useState, useEffect } from "react";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentByCustomer } from "../../store/action";


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
  const dispatch = useDispatch()
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
    if (user && user.role === "admin") {
      history.push("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchAppointmentByCustomer(user.CustomerId));
  },[])

  let appointments = useSelector(
    state => state.fetchAppointmentReducer.appointments
  );
  if(!appointments){
    return <></>
  }

  const data = appointments.filter(appointment => {
    const endAppointment = new Date(appointment.endDate)
    const now = new Date()
    return endAppointment < now
  })

  return (
    <div className="appointment-container">
      <SideMenu />
      <div className="main-container">
        <Header />
        <MainBoard listHeader={listHeader} data={data} />
      </div>
    </div>
  );
};

export default History;
