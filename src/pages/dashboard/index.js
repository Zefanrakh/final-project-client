import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./styles.scss";
import SideMenu from "../../components/sideMenu";
import Header from "../../components/header";
import MainBoard from "../../components/mainBoard";
import fetchDummyAction from "../../store/action/fetchDummy";
import { useHistory } from "react-router-dom";
import { dummyData } from "./dummydata";

const listHeader = [
  "Id",
  "Child Name",
  "Child Age",
  "Start Date",
  "End Date",
  "Notes",
  "Status",
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ userReducer }) => userReducer.user);
  const result = useSelector(
    ({ searchResultReducer }) => searchResultReducer.result
  );
  // const getDummyFromRedux = useSelector(
  //   ({ dummyReducer }) => dummyReducer.dummy
  // );

  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }
    if (user && user.role === "customer") {
      history.push("/appointment");
    }
  }, [user]);
  //example fetch reducer

  // console.log(getDummyFromRedux, "<<<<<");
  // useEffect(() => {
  // dispatch(fetchDummyAction());
  // }, []);
  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="main-container">
        <Header />
        <MainBoard
          listHeader={listHeader}
          data={result.length === 0 ? dummyData : result}
        />
      </div>
    </div>
  );
};

export default Dashboard;
