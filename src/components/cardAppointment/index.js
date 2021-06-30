import "./styles.scss";
import { useHistory } from "react-router-dom";
// import jwt from "jsonwebtoken";
const Card = ({ user, isAppointment }) => {
  const {
    id,
    childName,
    childAge,
    startDate,
    endDate,
    notes,
    status,
    type,
  } = user;
  
  const role = localStorage.getItem("role");

  const history = useHistory();

  const paymentHandler = () => {
    // const encodePayload = jwt.sign(
    //   { childName, startDate, endDate, notes, childAge, type },
    //   "privateKey"
    // );

    // history.push(`/appointment?payment=${encodePayload}`);
  };
  return (
    <div className="card-container">
      <div className="text-header id-text">{id}</div>
      <div className="text-header">{childName}</div>
      <div className="text-header">{childAge} Tahun</div>
      <div className="text-header">{startDate}</div>
      <div className="text-header">{endDate}</div>
      <div className="text-header see-more">see more....</div>
      <div
        className={`text-header ${
          status === "sudah bayar" ? "green-text" : "red-text"
        }`}
      >
        {status}
      </div>
      {isAppointment && (
        <div className="icon-qr">
          <i
            onClick={paymentHandler}
            class={`fas ${status === "belum bayar" ? "fa-cash-register" : ""}`}
          ></i>
        </div>
      )}
    </div>
  );
};

export default Card;
