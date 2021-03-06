import "./styles.scss";
import { useState, useEffect } from "react";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import AddAppointmentForm from "../../components/addAppointmentForm";
import FloatingButton from "../../components/floatingButton";
import { useHistory } from "react-router-dom";

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
    <div className="appointment-container">
      <SideMenu />
      <div className="main-container">
        <Header />
        <MainBoard listHeader={listHeader} dummyData={dummyData} />
      </div>
    </div>
  );
};

export default History;
