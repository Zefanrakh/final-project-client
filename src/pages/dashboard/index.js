import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Doughnut, Pie } from "react-chartjs-2";

import CardBanner from "../../components/cardBanner";
import SideMenu from "../../components/sideMenu";
import { useHistory } from "react-router-dom";
import BarChart from "../../components/barChart";
import { fetchCustomer } from "../../store/action";
import "./styles.scss";

const dummyAppointment = [
  {
    date: new Date("2021-01-01"),
    status: "canceled",
  },
  {
    date: new Date("2021-02-02"),
    status: "canceled",
  },
  {
    date: new Date("2021-03-07"),
    status: "canceled",
  },
  {
    date: new Date("2021-04-03"),
    status: "canceled",
  },
  {
    status: "canceled",
    date: new Date("2021-05-01"),
  },
  {
    date: new Date("2021-06-29"),
    status: "canceled",
  },
  {
    date: new Date("2021-06-30"),
    status: "canceled",
  },
  {
    date: new Date("2021-06-29"),
    status: "canceled",
  },
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [datePicker, setDatePicker] = useState(new Date());
  const history = useHistory();
  const user = useSelector(({ userReducer }) => userReducer.user);
  const [filteredResult, setFilteredResult] = useState({
    filteredByToday: [],
    filterByMonth: [],
  });

  const customers = useSelector(
    (state) => state.fetchCustomerReducer.customers
  );

  useEffect(() => {
    const filteredByToday = dummyAppointment.filter((item) => {
      return (
        item.date.toLocaleString().substring(0, 10) ===
        datePicker.toLocaleString().substring(0, 10)
      );
    });

    setFilteredResult({ ...filteredResult, filteredByToday });
  }, [datePicker]);

  useEffect(() => {
    const monthObj = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      Mei: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      Desember: 0,
    };

    dummyAppointment.forEach((data) => {
      month.forEach((item, idx) => {
        if (data.date.getMonth() === idx) {
          monthObj[item] += 1;
        }
      });
    });

    const objToArr = Object.values(monthObj);

    setFilteredResult({ ...filteredResult, filterByMonth: objToArr });
  }, []);

  useEffect(() => {
    dispatch(fetchCustomer());
  }, []);

  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }
    console.log(user, "DI DASHBOARD");
    if (user && user.role === "customer") {
      history.push("/appointment");
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="main-container">
        <div className="banner-container">
          <CardBanner title="Hello Admin" subTitle="welcome in daycare web!" />
        </div>
        <div className="data-container">
          <Calendar onChange={setDatePicker} value={datePicker} />
          <div className="info-container">
            <div className="chart-container">
              <div className="box-container">
                <Doughnut
                  data={{
                    labels: ["Infant", "Toddler"],
                    datasets: [
                      {
                        data: [30, 70],
                        backgroundColor: [
                          "rgb(255, 99, 132)",
                          "rgb(255, 205, 86)",
                        ],
                        hoverOffset: 4,
                        weight: 1,
                      },
                    ],
                  }}
                />
                <div className="title-category">Child Type</div>
              </div>
              <div className="box-container pie-container">
                <Pie
                  data={{
                    labels: ["Canceled", "Waiting Payment", "Paid"],
                    datasets: [
                      {
                        data: [30, 20, 50],
                        backgroundColor: [
                          "rgb(255, 99, 132)",
                          "rgb(255, 205, 86)",
                          "#A3E4D7",
                        ],
                        hoverOffset: 4,
                        weight: 1,
                      },
                    ],
                  }}
                />
                <div className="title-category"> Payment</div>
              </div>
              <div className="box-container">
                <Doughnut
                  data={{
                    labels: [
                      datePicker.toISOString().substring(0, 10),
                      "total",
                    ],
                    datasets: [
                      {
                        data: [
                          filteredResult.filteredByToday.length,
                          dummyAppointment.length,
                        ],
                        backgroundColor: ["#48C9B0", "#D71C60"],
                        hoverOffset: 4,
                        weight: 1,
                      },
                    ],
                  }}
                />
                <div className="title-category">Today/ Total Appointment</div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-container bar-chart">
          <BarChart month={month} data={filteredResult.filterByMonth} />
        </div>
        <div className="chart-container__bottom">
          <div className="box-container customer-box">
            <div className="member-number">{customers.length}</div>
            <div className="title-category text-member">
              Total Present List Today
            </div>
          </div>
          <div className="box-container customer-box">
            <div className="member-number">{customers.length}</div>
            <div className="title-category text-member">Total Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
