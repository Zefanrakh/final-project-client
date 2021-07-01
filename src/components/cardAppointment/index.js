import "./styles.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// import jwt from "jsonwebtoken";
const Card = ({ user, isAppointment }) => {
  const {
    id,
    childName,
    childAge,
    startDate,
    endDate,
    note,
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

  const showNotes = () => {
    Swal.fire({
      title: "Notes",
      text: note,
    });
  };

  return (
    <div className="card-container">
      <div className="text-header id-text">{id}</div>
      <div className="text-header">{childName}</div>
      <div className="text-header">{childAge} Tahun</div>
      <div className="text-header">{startDate}</div>
      <div className="text-header">{endDate}</div>
      <div className="text-header see-more" onClick={showNotes}>
        see more
      </div>
      <div
        className={`text-header ${
          status === "sudah bayar" ? "green-text" : "red-text"
        }`}
      >
        {status}
      </div>
    </div>
  );
};

export default Card;
