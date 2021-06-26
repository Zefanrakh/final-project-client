import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import fetchDummyAction from "../../store/action/fetchDummy";

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

const Dashboard = () => {
  //example fetch reducer
  const dispatch = useDispatch();
  const getDummyFromRedux = useSelector(
    ({ fetchDummyReducer }) => fetchDummyReducer.dummy
  );

  console.log(getDummyFromRedux, "<<<<<");
  useEffect(() => {
    dispatch(fetchDummyAction());
  }, []);
  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="main-container">
        <Header />
        <MainBoard listHeader={listHeader} dummyData={dummyData} />
      </div>
    </div>
  );
};

export default Dashboard;
