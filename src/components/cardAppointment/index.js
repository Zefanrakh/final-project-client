import "./styles.scss";
const Card = ({ user, isAppointment }) => {
  const { id, childName, childAge, startDate, endDate, notes, status } = user;
  const role = localStorage.getItem("role");

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
            class={`fas ${
              status === "belum bayar"
                ? "fa-cash-register"
                : role === "admin"
                ? "fa-qrcode"
                : ""
            }`}
          ></i>
        </div>
      )}
    </div>
  );
};

export default Card;
