import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Doughnut, Pie } from "react-chartjs-2";

import CardBanner from "../../components/cardBanner";
import SideMenu from "../../components/sideMenu";
import { useHistory } from "react-router-dom";
import BarChart from "../../components/barChart";
import {
  fetchCustomer,
  fetchAppointment,
  fetchPresence,
} from "../../store/action";

import "./styles.scss";

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
  const [filteredByToday, setFilteredByToday] = useState([]);
  const [filterByChildType, setFilterByChildType] = useState({
    toddler: 0,
    infant: 0,
  });
  const [filterByMonth, setFilterByMonth] = useState([]);
  const appointments = useSelector(
    (state) => state.fetchAppointmentReducer.appointments
  );
  const customers = useSelector(
    (state) => state.fetchCustomerReducer.customers
  );

  const presenceList = useSelector(
    (state) => state.fetchPresenceReducer.presenceList
  );

  const [isLoading, setIsLoading] = useState(true);

  const fetchingAllData = async () => {
    await dispatch(fetchCustomer());
    await dispatch(fetchAppointment());
    await dispatch(fetchPresence());

    setIsLoading(false);
  };

  useEffect(() => {
    fetchingAllData();
  }, []);

  const filterdDataHandler = async () => {
    const filteredByToday = await appointments.filter((item) => {
      if (
        new Date(datePicker).toDateString() ===
        new Date(item.startDate).toDateString()
      ) {
        return true;
      }

      var today = new Date(datePicker).getTime();
      var from = new Date(item.startDate).getTime();
      var to = new Date(item.endDate).getTime();
      var withinRange = today >= from && today <= to;
      return withinRange;
    });

    setFilteredByToday(filteredByToday);
  };

  useEffect(() => {
    filterdDataHandler();
  }, [datePicker, appointments]);

  const filteredByMonthHandler = async (monthObj) => {
    await appointments.forEach((data) => {
      month.forEach((item, idx) => {
        if (
          new Date(data.startDate).getMonth() === idx ||
          new Date(data.endDate).getMonth() === idx
        ) {
          monthObj[item] += 1;
        }
      });
    });

    const objToArr = await Object.values(monthObj);
    setFilterByMonth(objToArr);
  };

  const filteredByChildType = async () => {
    const obj = {
      toddler: 0,
      infant: 0,
    };
    await appointments.forEach((item) => {
      console.log(item);
      if (item.Price.category === "Toddler") {
        obj.toddler += 1;
      } else {
        obj.infant += 1;
      }
    });

    setFilterByChildType(obj);
  };

  useEffect(async () => {
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

    if (appointments.length) {
      filteredByMonthHandler(monthObj);
      filteredByChildType();
    }
  }, [appointments]);

  useEffect(() => {
    if (!localStorage.access_token) {
      history.push("/login");
    }
    if (user && user.role === "customer") {
      history.push("/appointment");
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <>
        <SideMenu />
        {!isLoading && (
          <div className="main-container">
            <div className="banner-container">
              <CardBanner
                title="Hello Admin"
                subTitle="welcome in daycare web!"
              />
            </div>
            <div className="data-container">
              <Calendar onChange={setDatePicker} value={datePicker} />
              <div className="info-container">
                <div className="chart-container">
                  {/* <div className="box-container pie-container">
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
                  </div> */}
                  <div className="box-container">
                    <Doughnut
                      data={{
                        labels: [
                          `${datePicker.getDate()}/${
                            datePicker.getMonth() + 1
                          }/${datePicker.getFullYear()}`,
                          "total",
                        ],
                        datasets: [
                          {
                            data: [
                              filteredByToday.length,
                              appointments.length - filteredByToday.length,
                            ],
                            backgroundColor: ["#48C9B0", "#D71C60"],
                            hoverOffset: 4,
                            weight: 1,
                          },
                        ],
                      }}
                    />
                    <div className="title-category">
                      {`${datePicker.getDate()}-${
                        datePicker.getMonth() + 1
                      }-${datePicker.getFullYear()}`}
                      / Total Appointment
                    </div>
                  </div>
                  <div className="box-container">
                    <Doughnut
                      data={{
                        labels: ["Infant", "Toddler"],
                        datasets: [
                          {
                            data: [
                              filterByChildType.infant,
                              filterByChildType.toddler,
                            ],
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
                </div>
              </div>
            </div>
            <div className="box-container bar-chart">
              <BarChart month={month} data={filterByMonth} />
            </div>
            <div className="chart-container__bottom">
              <div className="box-container customer-box">
                <div className="member-number">{presenceList.length}</div>
                <div className="title-category text-member">
                  Total Present List
                </div>
              </div>
              <div className="box-container customer-box">
                <div className="member-number">{customers.length}</div>
                <div className="title-category text-member">
                  Total Customers
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Dashboard;
