import "./styles.scss";
import { useState } from "react";
import { isEmpty } from "lodash";
import { addAppointment } from "../../store/action/"
import { useDispatch } from "react-redux"

const dummyDataMember = [
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

const AddAppointmentForm = ({ openPopUpHandler }) => {
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  const dispatch = useDispatch()
  let now = new Date()
  let nowStr = now.addDays(2).toISOString().substring(0, 10)
  const role = localStorage.getItem("role");
  const [customerData, setCustomerData] = useState({});
  const [customerChoosed, setCustomerChoosed] = useState([]);
  const [inputCustomerValue, setInputCustomerValue] = useState([]);
  const [ageValue, setAgeValue] = useState("");
  const [childName, setChildName] = useState("");
  const [note, setNote] = useState("");
  const [startDate, setStartDate] = useState(nowStr);
  const [endDate, setEndDate] = useState(nowStr);
  const [packageQty, setPackageQty] = useState(1);
  const [childCategory, setChildCategory] = useState("toddler");
  const [packageCategory, setPackageCategory] = useState("daily");
  const [completedCategory, setCompletedCategory] = useState(false);

  const onChangeHandler = (e) => {
    setCustomerChoosed({});
    setInputCustomerValue(e.target.value);
    const customers = dummyDataMember.filter((customer) => {
      console.log(customer);
      return e.target.value && customer.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    console.log(customers);
    setCustomerData(customers);
  };

  const saveAppointment = (e) => {
    e.preventDefault()
    let quantity = Number(packageQty)
    let endDateValue = endDate
    if(packageCategory === "daily"){
      quantity = Number(getDailyQty())
    }else{
      endDateValue = getEndDate()
    }
    let status = 'belum bayar'
    if(role === 'admin'){
      status = 'sudah bayar'
    }
    const payload = {
      CustomerId: Number(customerChoosed.id),
      childCategory,
      packageCategory,
      childName,
      childAge: Number(ageValue),
      quantity,
      note,
      startDate,
      endDate: endDateValue,
      status
    }
    console.log(payload);
    dispatch(addAppointment(payload))
    .then(({data})=> {
      console.log(data);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const changeStartDate = (e) => {
    setStartDate(e.target.value)
  }

  const changeEndDate = (e) => {
    setEndDate(e.target.value)
  }

  const getDailyQty = () => {
    const formatedStartDate = new Date(startDate)
    const formatedEndDate = new Date(endDate)
    console.log(formatedStartDate, formatedEndDate);
    const dateDiff = (formatedEndDate.getTime() - formatedStartDate.getTime()) / (1000 * 3600 * 24) + 1
    return dateDiff
  }

  const getEndDate = () => {
    if(packageCategory === 'weekly'){
      const formatedStartDate = new Date(startDate)
      const newEndDate = formatedStartDate.addDays((7 * packageQty)-1).toISOString().substring(0, 10)
      return newEndDate
    }else if (packageCategory === 'monthly'){
      const formatedStartDate = new Date (startDate)
      const newEndDate = formatedStartDate.addDays((30 * packageQty)-1).toISOString().substring(0, 10)
      return newEndDate
    }
  }

  return (
    <div className="overlay">
      <div className="add-appointment-container ">
        <div className="title">Add Appointment</div>
        <i className="fas fa-times icon-close" onClick={openPopUpHandler}></i>
        <form onSubmit={saveAppointment}>
          {!completedCategory && (
            <>
              {" "}
              <label>Choose Category</label>
              <div className="category-container">
                <div                  className={`category-text ${

                    childCategory === "toddler" && "active"
                  }`}
                  onClick={() => setChildCategory("toddler")}
                >
                  Toddler
                </div>
                <div
                  className={`category-text ${
                    childCategory === "infant" && "active"
                  }`}
                  onClick={() => setChildCategory("infant")}
                >
                  Infant
                </div>
              </div>
              <label>Choose Package</label>
              <div className="category-container">
                <div
                  className={`category-text ${
                    packageCategory === "daily" && "active"
                  }`}
                  onClick={() => setPackageCategory("daily")}
                >
                  Daily
                </div>
                <div
                  className={`category-text ${
                    packageCategory === "weekly" && "active"
                  }`}
                  onClick={() => setPackageCategory("weekly")}
                >
                  Weekly
                </div>
                <div
                  className={`category-text ${
                    packageCategory === "monthly" && "active"
                  }`}
                  onClick={() => setPackageCategory("monthly")}
                >
                  Monthly
                </div>
              </div>
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => {changeStartDate(e)}}/>
              {packageCategory === "daily" && (
                <>
                  <label>End Date</label>
                  <input type="date" value={endDate} onChange={(e) => {changeEndDate(e)}}/>
                </>
              )}
              {
              packageCategory !== "daily" &&
              <>
                <label>How many {packageCategory === "monthly"? "Month": "Week"}</label>
                <input
                  type="number"
                  value={packageQty}
                  onChange={(e) => setPackageQty(e.target.value)}
                />
              </>
              }
              {role === "admin" && (
                <>
                  <label>Find Customer</label>
                  <input
                    type="text"
                    onChange={onChangeHandler}
                    value={
                      isEmpty(customerChoosed)
                        ? inputCustomerValue
                        : customerChoosed.name
                    }
                  />
                </>
              )}
            </>
          )}

          {!isEmpty(customerData) && isEmpty(customerChoosed) && (
            <div className="find-customer">
              {customerData.map((customer, idx) => {
                return (
                  <div className="customer-name__container" key={idx}>
                    <div className="customer-name">{customer.name}</div>
                    <div
                      className="text-choose"
                      onClick={() => setCustomerChoosed(customer)}
                    >
                      choose
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {completedCategory && (
            <>
              <label>Child Name</label>
              <input type="text" onChange={(e) => setChildName(e.target.value)}/>
              <label>Child Age</label>
              <input
                type="number"
                value={ageValue}
                onChange={(e) => setAgeValue(e.target.value)}
              />
              <label>Note</label>
              <textarea onChange={(e) => setNote(e.target.value)}/>
            </>
          )}
          {completedCategory ? (
            <button>Submit</button>
          ) : (
            <div
              className="button-next__container"
              onClick={() => setCompletedCategory(true)}
            >
              <div></div> Next <i className="fas fa-arrow-right"></i>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentForm;
