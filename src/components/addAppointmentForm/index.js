import "./styles.scss";
import { useState } from "react";
import { isEmpty } from "lodash";

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
  const role = localStorage.getItem("role");
  const [customerData, setCustomerData] = useState({});
  const [customerChoosed, setCustomerChoosed] = useState([]);
  const [inputCustomerValue, setInputCustomerValue] = useState([]);
  const [ageValue, setAgeValue] = useState("");
  const [childCategory, setChildCategory] = useState("toddler");
  const [packageCategory, setPackageCategory] = useState("daily");
  const [completedCategory, setCompletedCategory] = useState(false);

  const onChangeHandler = (e) => {
    setCustomerChoosed({});
    setInputCustomerValue(e.target.value);
    const customers = dummyDataMember.filter((customer) => {
      return e.target.value && customer.name.includes(e.target.value);
    });

    setCustomerData(customers);
  };

  return (
    <div className="overlay">
      <div class="add-appointment-container ">
        <div class="title">Add Appointment</div>
        <i class="fas fa-times icon-close" onClick={openPopUpHandler}></i>
        <form>
          {!completedCategory && (
            <>
              {" "}
              <label>Choose Category</label>
              <div className="category-container">
                <div
                  className={`category-text ${
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
              {customerData.map((customer) => {
                return (
                  <div className="customer-name__container">
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
              <input type="text" />
              <label>Child Age</label>
              <input
                type="number"
                value={ageValue}
                onChange={(e) => setAgeValue(e.target.value)}
              />
              <label>Start Date</label>
              <input type="date" />
              {packageCategory === "daily" && (
                <>
                  <label>End Date</label>
                  <input type="date" />
                </>
              )}
              <label>Note</label>
              <textarea />
            </>
          )}
          {completedCategory ? (
            <button>Submit</button>
          ) : (
            <div
              className="button-next__container"
              onClick={() => setCompletedCategory(true)}
            >
              <div></div> Next <i class="fas fa-arrow-right"></i>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentForm;
