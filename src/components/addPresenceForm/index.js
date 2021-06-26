import "./styles.scss";
import { useState } from "react";

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

  return (
    <div className="overlay">
      <div class="add-presence-container ">
        <div class="title">Add Presence</div>
        <i class="fas fa-times icon-close" onClick={openPopUpHandler}></i>
        <form>
          <label>Dropper</label>
          <input type="text" placeholder="Masukan Dropper" />
          <label>Pickuper</label>
          <input type="text" placeholder="Masukan Pickuper" />
          <label>Date</label>
          <input type="date" />
          <label>Time</label>
          <input type="time" />

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
