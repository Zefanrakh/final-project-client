import "./styles.scss";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import {
  addAppointment,
  fetchCustomer,
  fetchAppointment,
  fetchAppointmentByCustomer,
  fetchPriceList
} from "../../store/action/";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvoice,
  createPaymentDetail,
  setError,
} from "../../store/action/payment";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

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
  const history = useHistory();
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchCustomerReducer.customers);
  const priceList = useSelector((state) => state.priceReducer.priceList);
  let price = []
  let now = new Date();
  let nowStr = now.addDays(2).toISOString().substring(0, 10);
  const user = useSelector(({ userReducer }) => userReducer.user);
  const role = user.role;
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
  const [quantity, setQuantity] = useState(1)

  // const [input , setInput] = useState({
  //   note: '',
  //   childName: '',
  //   childAge: 0,
  //   startDate: nowStr,
  //   endDDate:nowStr,
  // })

  useEffect( async () => {
    await dispatch(fetchCustomer());
    await dispatch(fetchPriceList());
  }, []);

  if (!data) {
    return <p>Loading..</p>;
  }
  /// display price from the price find in pricelist
  if(priceList){
    price = priceList.find(item => item.package === selectedPackage && item.category === selectedCategory)
  }
  const onChangeHandler = (e) => {
    setSelectedCustomer({});
    setInputCustomerValue(e.target.value);
    const customers = data.filter((customer) => {
      return (
        e.target.value &&
        customer.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setCustomerData(customers);
  };
  const saveAppointment = async (e) => {
    e.preventDefault();
    setQuantity(Number(packageQty));
    let endDateValue = endDate;
    if (selectedPackage === "Daily") {
      setQuantity(Number(getDailyQty()));
    } else {
      endDateValue = getEndDate();
    }
    let status = "belum bayar";
    if (role === "admin") {
      status = "sudah bayar";
    }
    let CustomerId = Number(selectedCustomer.id);
    if (role === "customer") {
      CustomerId = user.Customer.id;
    }
    const payload = {
      CustomerId: CustomerId,
      childCategory: selectedCategory,
      packageCategory: selectedPackage,
      childName,
      childAge: Number(ageValue),
      quantity,
      note,
      startDate,
      endDate: endDateValue,
      status,
    };

    //fetch price from price table, amount ==== price  <<<<<<<<<<<<<
    console.log(selectedCustomer,'===>');
    const invoicePayload = {
      amount: price.price * quantity,
      email: 'dudebahrulhayat@gmail.com',
      description: `${selectedPackage} - ${selectedCategory}`,
    };

    try {
      const appointment = await dispatch(addAppointment(payload));
      if (role === 'admin') {
        await dispatch(fetchAppointment())
        openPopUpHandler()
      } else {
        await dispatch(fetchAppointmentByCustomer(CustomerId))
        const invoice = await dispatch(createInvoice(invoicePayload))
        console.log(invoice.data.invoiceUrl,'====>');
        
        //dummyPrice and quantity
        const paymentPayload = {
          price: price.price,
          quantity: quantity,
          AppointmentId: appointment.data.id,
          InvoiceId: invoice.data.id,
        }
        await dispatch(createPaymentDetail(paymentPayload))
        //submit appointment -- redirect to payment detail page, <<<<<<<<<<<<
        //query or params
        // history.push(`/paymentDetail/${invoice.invoiceUrl}`)
        //window.location.href = invoice.data.invoiceUrl
        openPopUpHandler()
        window.open(
          invoice.data.invoiceUrl,
          '_blank'
        );
      }
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
      dispatch(setError(error));
    }
  };

  const changeStartDate = (e) => {
    setStartDate(e.target.value);
    getDailyQty()
  };

  const changeEndDate = (e) => {
    setEndDate(e.target.value);
    getDailyQty()
  };

  const getDailyQty = () => {
    const formatedStartDate = new Date(startDate);
    const formatedEndDate = new Date(endDate);
    const dateDiff =
      (formatedEndDate.getTime() - formatedStartDate.getTime()) /
        (1000 * 3600 * 24) +
      1;
    setQuantity(dateDiff)
  };

  const getEndDate = () => {
    if (selectedPackage === "Weekly") {
      const formatedStartDate = new Date(startDate);
      const newEndDate = formatedStartDate
        .addDays(7 * packageQty - 1)
        .toISOString()
        .substring(0, 10);
      return newEndDate;
    } else if (selectedPackage === "Monthly") {
      const formatedStartDate = new Date(startDate);
      const newEndDate = formatedStartDate
        .addDays(30 * packageQty - 1)
        .toISOString()
        .substring(0, 10);
      return newEndDate;
    }
  };

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
                <div
                  className={`category-text ${
                    selectedCategory === "Toddler" && "active"
                  }`}
                  onClick={() => setSelectedCategory("Toddler")}
                >
                  Toddler
                </div>
                <div
                  className={`category-text ${
                    selectedCategory === "Infant" && "active"
                  }`}
                  onClick={() => setSelectedCategory("Infant")}
                >
                  Infant
                </div>
                Total price: {price.price * quantity}
              </div>
              <label>Choose Package</label>
              <div className="category-container">
                <div
                  className={`category-text ${
                    selectedPackage === "Daily" && "active"
                  }`}
                  onClick={() => setSelectedPackage("Daily")}
                >
                  Daily
                </div>
                <div
                  className={`category-text ${
                    selectedPackage === "Weekly" && "active"
                  }`}
                  onClick={() => setSelectedPackage("Weekly")}
                >
                  Weekly
                </div>
                <div
                  className={`category-text ${
                    selectedPackage === "Monthly" && "active"
                  }`}
                  onClick={() => setSelectedPackage("Monthly")}
                >
                  Monthly
                </div>
              </div>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  changeStartDate(e);
                }}
              />
              {selectedPackage === "Daily" && (
                <>
                  <label>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      changeEndDate(e);
                    }}
                  />
                </>
              )}
              {selectedPackage !== "Daily" && (
                <>
                  <label>
                    How many {selectedPackage === "Monthly" ? "Month" : "Week"}
                  </label>
                  <input
                    type="number"
                    value={packageQty}
                    onChange={(e) => {
                      setPackageQty(e.target.value)
                      setQuantity(e.target.value)
                    }}
                  />
                </>
              )}
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
              <input
                type="text"
                onChange={(e) => setChildName(e.target.value)}
              />
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
