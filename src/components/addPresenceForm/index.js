import "./styles.scss";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment, fetchPresence } from "../../store/action";
import { addPresence } from "../../store/action";
import QRCode from "react-qr-code";

const AddMemberForm = ({ openPopUpHandler }) => {
  const [imageUrl, setImageUrl] = useState("");
  function openUploadModal() {
    window.cloudinary
      .openUploadWidget(
        {
          cloud_name: "dfh39qfib",
          upload_preset: "rwfxz7rj",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setImageUrl(result.info.url);
          }
        }
      )
      .open();
  }

  const dispatch = useDispatch();
  let now = new Date();
  let nowStr = now.toISOString().substring(0, 10);
  const appointments = useSelector(
    (state) => state.fetchAppointmentReducer.appointments
  );
  const [appointmentData, setAppointmentData] = useState({});
  const [appointmentChoosed, setAppointmentChoosed] = useState([]);
  const [inputAppointmentValue, setInputAppointmentValue] = useState([]);
  const [showQrcode, setShowQrcode] = useState(false);
  const [linkAkses, setLinkAkses] = useState("");
  const [inputForm, setInputForm] = useState({
    AppointmentId: "",
    dropperName: "",
    pickupperName: "",
    presenceDate: nowStr,
    pickupTime: "",
  });

  useEffect(() => {
    dispatch(fetchAppointment());
  }, []);
  if (!appointments) {
    return <p>Loading..</p>;
  }
  const onChangeHandler = (e) => {
    setAppointmentChoosed({});
    setInputAppointmentValue(e.target.value);
    const filteredData = appointments.filter((appointment) => {
      return (
        e.target.value &&
        appointment.childName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    });
    setAppointmentData(filteredData);
  };
  const createPresence = (e) => {
    e.preventDefault();
    console.log(inputForm);
    dispatch(addPresence(inputForm))
      .then(({ data }) => {
        console.log(data);
        dispatch(fetchPresence());
        setLinkAkses(
          `https://day-care-32c02.web.app/viewer/${appointmentChoosed.Price.category}?token=${data.token}`
        );
        setShowQrcode(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  return (
    <div className="overlay">
      <div className="add-presence-container ">
        {!showQrcode ? (
          <>
            <div className="title">Add Presence</div>
            <i
              className="fas fa-times icon-close"
              onClick={openPopUpHandler}
            ></i>
            <form onSubmit={createPresence}>
              {/* <QRCode value="hey"/> */}
              <label>Find Appointment</label>
              <input
                type="text"
                onChange={onChangeHandler}
                value={
                  isEmpty(appointmentChoosed)
                    ? inputAppointmentValue
                    : appointmentChoosed.childName
                }
              />
              {!isEmpty(appointmentData) && isEmpty(appointmentChoosed) && (
                <div className="find-customer">
                  {appointmentData.map((appointment, idx) => {
                    return (
                      <div className="customer-name__container" key={idx}>
                        <div className="customer-name">
                          {appointment.childName} ({appointment.Price.category})
                          - {appointment.Customer.name}
                        </div>
                        <div
                          className="text-choose"
                          onClick={() => {
                            setAppointmentChoosed(appointment);
                            setInputForm({
                              ...inputForm,
                              AppointmentId: appointment.id,
                            });
                          }}
                        >
                          choose
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <label>Dropper</label>
              <input
                type="text"
                placeholder="Masukan Dropper"
                onChange={(e) =>
                  setInputForm({ ...inputForm, dropperName: e.target.value })
                }
              />
              <label>Pickuper</label>
              <input
                type="text"
                placeholder="Masukan Pickuper"
                onChange={(e) =>
                  setInputForm({ ...inputForm, pickupperName: e.target.value })
                }
              />
              <label>Date</label>
              <input
                type="date"
                onChange={(e) =>
                  setInputForm({ ...inputForm, presenceDate: e.target.value })
                }
              />
              <label>Time</label>
              <input
                type="time"
                onChange={(e) =>
                  setInputForm({ ...inputForm, pickupTime: e.target.value })
                }
              />

              <button>Submit</button>
            </form>
          </>
        ) : (
          <>
            <div className="title">Qr-Code</div>
            <i
              className="fas fa-times icon-close"
              onClick={openPopUpHandler}
            ></i>
            <div id="print-area">
              <QRCode value={linkAkses} />
            </div>
            <input
              type="button"
              onClick={() => printDiv("print-area")}
              value="print"
            />
            <a href={linkAkses}>{linkAkses}</a>
          </>
        )}
      </div>
    </div>
  );
};

export default AddMemberForm;
