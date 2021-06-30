import "./styles.scss";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { addAppointment, fetchCustomer, fetchAppointment, fetchAppointmentByCustomer } from "../../store/action/"
import { useDispatch, useSelector } from "react-redux"
import { createInvoice, createPaymentDetail, setError } from "../../store/action/payment";
import { useHistory } from "react-router";

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
  const history = useHistory()
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  const dispatch = useDispatch()
  const data = useSelector(state => state.fetchCustomerReducer.customers)
  const priceList = useSelector(state => state.priceReducer.priceList)
  /// display price from the price find in pricelist
  // const price = priceList.find(item => item.package === selectedPackage && item.category === selectedCategory)

  let now = new Date()
  let nowStr = now.addDays(2).toISOString().substring(0, 10)
  const user = useSelector(({ userReducer }) => userReducer.user);
  const role = user.role
  const [customerData, setCustomerData] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [inputCustomerValue, setInputCustomerValue] = useState([]);
  const [ageValue, setAgeValue] = useState("");
  const [childName, setChildName] = useState("");
  const [note, setNote] = useState("");
  const [startDate, setStartDate] = useState(nowStr);
  const [endDate, setEndDate] = useState(nowStr);
  const [packageQty, setPackageQty] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Toddler");
  const [selectedPackage, setSelectedPackage] = useState("Daily");
  const [completedCategory, setCompletedCategory] = useState(false);

  // const [input , setInput] = useState({
  //   note: '',
  //   childName: '',
  //   childAge: 0,
  //   startDate: nowStr,
  //   endDDate:nowStr,
  // })

  useEffect(() => {
    dispatch(fetchCustomer())
  }, [])
  if (!data) {
    return <p>Loading..</p>
  }
  const onChangeHandler = (e) => {
    setSelectedCustomer({});
    setInputCustomerValue(e.target.value);
    const customers = data.filter((customer) => {
      return e.target.value && customer.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setCustomerData(customers);
  };

  const saveAppointment = async (e) => {
    e.preventDefault()
    let quantity = Number(packageQty)
    let endDateValue = endDate
    if (selectedPackage === "Daily") {
      quantity = Number(getDailyQty())
    } else {
      endDateValue = getEndDate()
    }
    let status = 'belum bayar'
    if (role === 'admin') {
      status = 'sudah bayar'
    }
    let CustomerId = Number(customerChoosed.id)
    if (role === 'customer') {
      CustomerId = user.CustomerId
    }
    const payload = {
      CustomerId: CustomerId,
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

    //fetch price from price table, amount ==== price  <<<<<<<<<<<<<
    const invoicePayload = {
      amount: 500000,
      email: "test@email.com",
      description: '${selectedPackage} - ${selectedCategory}' //  dummydata
    }

    try {
      const appointment = await dispatch(addAppointment(payload))
      if (role === 'admin') {
        await dispatch(fetchAppointment())
      } else {
        await dispatch(fetchAppointmentByCustomer(CustomerId))
      }
      const invoice = await dispatch(createInvoice(invoicePayload))
      //dummyPrice and quantity
      const paymentPayload = {
        price: 500000,
        quantity: 2,
        AppointmentId: appointment.data.id,
        InvoiceId: invoice.data.id,
      }
      await dispatch(createPaymentDetail(paymentPayload))
      //submit appointment -- redirect to payment detail page, <<<<<<<<<<<<
      //query or params
      // history.push(`/paymentDetail/${invoice.invoiceUrl}`)
    } catch (error) {
      dispatch(setError(error))
    }
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
    if (selectedPackage === 'weekly') {
      const formatedStartDate = new Date(startDate)
      const newEndDate = formatedStartDate.addDays((7 * packageQty) - 1).toISOString().substring(0, 10)
      return newEndDate
    } else if (selectedPackage === 'monthly') {
      const formatedStartDate = new Date(startDate)
      const newEndDate = formatedStartDate.addDays((30 * packageQty) - 1).toISOString().substring(0, 10)
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
                <div className={`category-text ${selectedCategory === "Toddler" && "active"
                  }`}
                  onClick={() => setSelectedCategory("Toddler")}
                >
                  Toddler
                </div>
                <div
                  className={`category-text ${selectedCategory === "infant" && "active"
                    }`}
                  onClick={() => setSelectedCategory("infant")}
                >
                  Infant
                </div>
              </div>
              <label>Choose Package</label>
              <div className="category-container">
                <div
                  className={`category-text ${selectedPackage === "Daily" && "active"
                    }`}
                  onClick={() => setSelectedPackage("Daily")}
                >
                  Daily
                </div>
                <div
                  className={`category-text ${selectedPackage === "weekly" && "active"
                    }`}
                  onClick={() => setSelectedPackage("weekly")}
                >
                  Weekly
                </div>
                <div
                  className={`category-text ${selectedPackage === "monthly" && "active"
                    }`}
                  onClick={() => setSelectedPackage("monthly")}
                >
                  Monthly
                </div>
              </div>
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => { changeStartDate(e) }} />
              {selectedPackage === "Daily" && (
                <>
                  <label>End Date</label>
                  <input type="date" value={endDate} onChange={(e) => { changeEndDate(e) }} />
                </>
              )}
              {
                selectedPackage !== "Daily" &&
                <>
                  <label>How many {selectedPackage === "monthly" ? "Month" : "Week"}</label>
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
                      isEmpty(selectedCustomer)
                        ? inputCustomerValue
                        : selectedCustomer.name
                    }
                  />
                </>
              )}
            </>
          )}

          {!isEmpty(customerData) && isEmpty(selectedCustomer) && (
            <div className="find-customer">
              {customerData.map((customer, idx) => {
                return (
                  <div className="customer-name__container" key={idx}>
                    <div className="customer-name">{customer.name}</div>
                    <div
                      className="text-choose"
                      onClick={() => setSelectedCustomer(customer)}
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
              <input type="text" onChange={(e) => setChildName(e.target.value)} />
              <label>Child Age</label>
              <input
                type="number"
                value={ageValue}
                onChange={(e) => setAgeValue(e.target.value)}
              />
              <label>Note</label>
              <textarea onChange={(e) => setNote(e.target.value)} />
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
