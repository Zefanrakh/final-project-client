import jwt from "jsonwebtoken";
const Card = ({ user }) => {
  const {
    id,
    dropperName,
    pickupperName,
    pickupTime,
    presenceDate,
    Appointment,
  } = user;
  return (
    <div className="card-container">
      <div className="text-header id-text">{id}</div>
      <div className="text-header">{Appointment.childName}</div>
      <div className="text-header">{dropperName}</div>
      <div className="text-header">{pickupperName}</div>
      <div className="text-header green-text">{pickupTime}</div>
      <div className="text-header blue-text">{presenceDate}</div>
    </div>
  );
};

export default Card;
